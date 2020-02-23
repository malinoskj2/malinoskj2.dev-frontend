Every project needs one right? So it seems that after a busy few weeks I finally had the time to carve out a little piece of the internet for myself. This blog is very much a work in progress (try using any of the buttons in the nav), also I can't promise the bright pink accents will stay, but hey, you are able to read this post right? It seems like as good a time as any to start posting.  

  
As far as content goes you can expect.    
* posts featuring stuff I am working on
* misc programming-related content including but not limited to
  * java, javascript, rust
  * web application application development
  * fun stuff

Be sure to keep an eye out for updates, I'm going to be finishing up some
interesting projects that I am excited to share with you in the near future.
Posts will be available on this page as well as directly via RSS at [rss.malinoskj2.dev](https://rss.malinoskj2.dev).

### building a blog

There are a couple different ways you can get your content out there. What is best for you depends on your requirements.  

If you don't care about having full control over the blog itself or don't have a technical background, 
use a blogging platform. A site like [Medium](https://medium.com/) would be fine. If you want control over the means of distribution, and can live with having a moderate level of control over the pages themselves. 
You can use a static site generator, which simply spits out static files based on templates and themes, [Hugo](https://gohugo.io/) is a popular one. You can distribute the static files with [Github Pages](https://pages.github.com/) or [Netlify](https://www.netlify.com/) without much effort.

Those 2 options should be good enough for the majority of people.

If you want end to end control (*to an extent*) of the whole thing, all content, the implementation of the site itself,
and how it makes it into the hands of readers, step into my world. 

### why

So why could you want full control when clearly you can display content on the internet with far less effort through other means?
Some reasons off the top of my head.  

* You need the control to differentiate your site
* You need the control for analytics

If you are running a business you probably care about some of that.

*or maybe you just want to be in control of your own destiny*

### requirements

I want my readers to have the best experience possible, and I want as streamlined a development experience as possible.
With that in mind here are my requirements.

1. Posting is easy
    * I should be able to post content with the same ease as the typical blogging platform
    * New posts should be available to readers immediately upon their creation.
2. Development experience is productive, allowing for easy iteration on features
   * Should be able to push code to master and have the changes immediately reflected in production.
3. The blog's performance is excellent
    * pages download quickly
    * no big slowdowns related to js

### Vue 
Out of the gate, I wanted to typical yet modern architecture, a [SPA](https://en.wikipedia.org/wiki/Single-page_application) 
composed of a few reusable components. The most straightforward way of achieving that is by using one of the well-known Javascript frameworks such as Angular, React, or Vue.

Having spent a good amount of time working with using node server-side, and having some general exposure to Html and CSS, learning a javascript framework is not too much additional work. I picked up Vue around a year or so and it does the job well enough. *Vue puts a large focus on accessibility*. Using the [CLI](https://cli.vuejs.org/) you'll get state management, routing, and other useful features out of the box.

Making a component is intuitive enough. Here is a basic Vue [single file component](https://vuejs.org/v2/guide/single-file-components.html) from their docs.

```javascript
// example Vue single file component

<template>
  <p> {{ greeting }} World!</p>
</template>

<script>
module.exports = {
    data: function() {
        return {
            greeting: 'Hello'
        }
    }
}
</script>

<style scoped> 
p {
  font-size: 2em;
  text-align: center;
}
</style>
```

Vue single file components enforce a clear separation of concerns between your markup, scripting logic, and styling. Having styles scoped as a default is a huge win if you care about productivity in the slightest. CSS's cascading nature is the source of a large majority of the frustration experienced when working with it. Even in simple projects, it can be hard to anticipate the effects of the cascade. Data in the script block can easily be accessed from within the markup using the double curly brace syntax shown above.

### The SPA

### state
The implementation of the spa itself is pretty cool.
The site uses Vuex, the default state management solution provided by Vue's CLI. A Vuex store that has yet to be implemented will look something like this.

```javascript
const store = new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
});
```
You've got a "state" property. That is where you can simply define properties where you will store your applications state. The "getters" property allows you to define functions that will produce cached values derived from your state. Once you have defined some state it can be mutated via functions defined in the "mutations property". "Actions" allow you to define functions to be invoked asynchronously, so you'll be relying on them to achieve some concurrency when mutating state.

It's common to break the store up into modules that handle different types of state. For example, a video streaming site might have one module that stores data pertaining to videos, and another dedicated to storing information about the user.  This site follows that pattern implementing a module containing some data about user access times as well as module handling blog posts. 

In the [posts](https://github.com/malinoskj2/malinoskj2.dev-frontend/blob/master/src/store/mod/posts.js) module 
I have defined 2 actions 

```javascript
actions: {
        async initPosts(context) {
            const posts = await client.getRecentPosts();
            context.commit('setPosts', posts);
        },
        async initPostById(context, payload) {
            const res = context.getters.postById(payload.id);

            if (!res) {
                const post = await client.getPostById(payload.id);
                context.commit('setPosts', [post]);
            }
        }
}
```
*initPosts* simply gets all the blog posts post's from a CMS and is invoked when users navigate to the homepage. The function is being invoked early on during the initial page load, so there will be a lot going on and it's definitely in the critical path. Any blocking while network requests are out would have an impact on time to interactive. By defining it as an action it will be invoked asynchronously, so we don't keep the browser waiting on comparatively slow network requests.

It's important to maintain a clear separation of concern when dealing with network requests especially.  Anywhere IO is occuring will be a prime spot for errors which you will inevitably be writing some code to handle. That can easily result in tight coupling between your business logic the IO itself. The purpose of the store is to manage the site's state not execute requests on the network, so I just factor out the request handling logic to a separate module.

This invocation simply retrieves the data though. It won't be persisted without some further code. Also, the shape of the data is not immediately in the ideal form to be consumed when received, so it needs to be processed on the client-side before being accessed by components.     

Both functions call *context.commit* which allows you to invoke a mutation in Vuex, one of which I have defined in the posts module.

```javascript
   mutations: {
        setPosts(state, posts) {
            state.posts = posts.map(post => {
                const date = dayjs(post.publishedAt);
                return {
                    ...post,
                    publishedAt: date,
                    dateString: date.format('MMMM-YYYY'),
                    readingStats: readingTime(post.content),
                    content: markdown.markdown.toHTML(post.content),
                    url: generatePostUrl(post)
                }
            });
        },
}, 
```
When the actions mentioned previously resolve, they will 
invoke *setPosts* to process and store the received data (the sites content in this case). One thing to note is that the posts are written and stored in markdown in the cms, which as you can see, is parsed into the corresponding HTML on the client here. Yeah, there is a performance impact to do doing that, it's not going to matter much here though for a few reasons.

Firstly, at the time of this post's release, there is going to be a single markdown file to parse. That is not much parsing for the client to do. Secondly, all posts are persisted across page site visits in their parsed state via [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API). So assuming users are not preventing the site from accessing localStorage or frequently clearing their localStorage, they will be parsing each post once and only once. On top of that, I'm probably going to switch to [SSR](https://vuejs.org/v2/guide/ssr.html) at some point. I do much prefer the more modern client-server interaction that you get with a SPA but the performance benefits of SSR are undeniable. When that happens users will just get the complete page with no additional client-side parsing. I'm saving that for a rainy day tho.

As far as state and getters go there is not much going on.

```javascript
    state: {
        posts: [],
    },
    getters: {
        posts: (state) => state.posts,
        postById: (state) => (id) => {
            const res = state.posts.find(post => post._id === id);
            if (res) {
                return res;
            }
},
```
I've got exactly the functionality the site needs and nothing more. An empty array and getters to expose relevant data
to components.

### site layout / routing

Taking a look at App.vue's template, you'll see the basic layout of the site.

```html
// App.vue

<template>

    <div id="app">
        // Overlay with dynamically shown elements based on user page position
        <router-view name="overlay" :headerIsVisible="supportsIntersectionObserver() ? headerIsVisible : true"/>

        <transition appear name="slide-fade-notify">
        <div id="layout">
            // The header of the page
            <router-view name="header" v-observe-visibility="{callback: visibilityChanged, throttle: 50}"/>
            // The main content area of the page
            <router-view class="main-view-top-pad"/>
        </div>
        </transition>

        <div id="layout-footer">
            <transition appear name="basic-fade">
                // The footer
                <router-view name="footer" v-if="footerIsVisible"
                             :socialMediaLinkData="socialMediaLinkData" id="footer"/>
            </transition>
        </div>

    </div>

</template>
```

The key thing to notice here is the multiple router-view elements. router-view is a component provided by [vue-router](https://router.vuejs.org/) and enables the typical SPA pattern of dynamic changes to the page without an actual page change. When the user requests a page, different components are shown in place of the router-view elements depending on which path is matched in the router. 
 
 ```javascript
 // router.js
        {
            path: '/',
            name: 'home',
            components: {
                overlay: Overlay,
                header: Header,
                default: Home2,
                footer: Footer
            }
        },
        {
            path: '/about',
            name: 'about',
            components: {
                overlay: Overlay,
                header: Header,
                default: About,
                footer: Footer
            }
},
```
In the "router.js" module, each route lists the names of each router-view element in App.vue with a corresponding component. When a user navigates to the website and a defined route is matched, the corresponding components will be shown. Defining your site's layout in this manner does not take much effort yet allows your site to display content in a highly dynamic manner. 

I'm not going to go into implementation specifics of every component. This is more meant to be an overview of my experience than a lecture on Vue component implementation but for those curious, the code is available on 
[Github](https://github.com/malinoskj2/malinoskj2.dev-frontend).

### Deployment :bomb:
One thing that became immediately obvious to me after developing my previous website (which was never updated past its inception) was the need to be able to iterate quickly. I imagine most people starting a blog intend on writing some markdown and throwing out some ideas. I not being forced to spend their time messing with Nginx configs so their share button works with twitter's [content security policy](https://blog.twitter.com/engineering/en_us/a/2013/csp-to-the-rescue-leveraging-the-browser-for-security.html).

So when creating this site It was of great importance to me to have some sort of productive workflow setup. I needed to be able to both iterate on the code powering the site as well as post new content without much effort. We established the fact that yes, I am trading convenience for some work upfront, but that work needs to remain upfront. When everything is 
said and done I should be able to post just as easily as If I were using some blogging pattern and retain the benefit of flexibility from having a higher degree of control.

### Deployment Version 1

 Prior to working the site I already had a bit of infrastructure standing up. If it can even be called infrastructure. That pretty much consists of a single AWS free tier EC2 instance running Nginx in front of some docker containers. I pretty much just run a few services on for personal use and bounce files from machine to machine off of it. Probably not their intended use case because I'm not touching auto-scaling or anything just using it as if it was a VPS. LightSail is not included in free-tier as far as I can tell though so I'm not paying them when the free tier EC2 works just as well.
This is pretty much what it looked like:  

![deployment version 1 flow chart](https://cms.malinoskj2.dev/storage/uploads/2019/06/03/5cf4c58f39c7edocker_proxy2.png)

So considering the fact that I had Nginx already up and running on EC2. Trying to put together a reasonable workflow with what I already had in place seems like a good option. So what more is required from here? 

First off, the site needs a domain. I had already grabbed "malinoskj2" back when the ".dev" TLD released. That'll work.

Ok, what then? Next, I need to deliver decide how the files will be delivered to users when they hit the domain. Immediately a world of options opens up. Building the spa via Vue's CLI/service produces a bunch of static files, which obviously gives you a lot of flexibility when you go to deploy into production. Typically with services likes Github Pages and 
Netlify you can automate deployment based on pushes to specific git branches. So you change some code, push to a production branch, and the code is built then deployed. That is productive enough so why not rig something up to achieve the same workflow but in my own ec2 + Nginx based environment.

Fortunately, I already have most of my projects including this site rigged up to be built automatically on each push to Github via [Travis CI](https://travis-ci.com/). This a nice convenience and free for open source projects so no reason not to. You just need to link Travis to your project's Github repository and add a YAML file telling Travis what to do.

This was my .travis.yml file: 

```yaml
language: node_js
node_js:
- stable
cache: npm
install:
- npm install
- npm run build
```
Ideally, you would run some tests in there also, but I am mostly a backend guy and not trying to put things on hold to learn how to properly test all this frontend stuff. So yeah when the site's pink accents randomly turn green one day, you will have to deal with that. I think you will be ok.

Perfect. whenever I push to Github, Travis builds the site with the updated source. Now we just need to serve the artifacts produced by the Travis build to the users. If we could get the files from Travis onto my EC2 instance then I can just point the "malinoskj2.dev" domain at that, and serve the files via the Nginx setup I already have. Travis has a deploy function that makes this possible with some slight modifications to .travis.yml.

Before jumping into the YAML some stuff should be set up on the server to ensure a reasonable level of security. You are going to be letting Travis hop on your server to place the files. I don't really like that but if it is going to happen it needs to be in a controlled manner. My solution was to make a 'deploy' group on the server. The only member being my user, Nginx, 
and a user created for Travis. Nginx is pointed at directory from which the files will be served. The group has the minimum permissions necessary to access/write the directory and no more.

with that setup I present to you the updated config:

```yaml
language: node_js
node_js:
- stable
cache: npm
addons:
  apt: 
    packages:
      - awscli 
install:
- npm install
- npm run build
before_install:
- openssl aes-256-cbc -K $encrypted_37e5a2a3979a_key -iv $encrypted_37e5a2a3979a_iv
  -in id_rsa.enc -out id_rsa -d
deploy: 
  skip_cleanup: true
  provider: script
  script: scripts/deploy.sh
  on:
branch: master
```

This script now has a deploy section. I set it up to only deploy on pushes to master. This means I can work on the development branch without changes being pushed into production. When I am really sure a change is ready to go out, then I can push it to master and it will be deployed. Once the code is pushed to master and built successfully, Travis will run
a script I've provided which contains the logic to place the updated files on to EC2 to be distributed. Notice the decryption taking place in the "before_install" step. The credentials required for them to access the EC2 instance are stored in the repo, encrypted with their key. The creds will be decrypted during the build process as needed to deploy onto EC2. 

This actually works but only when the project is a small scale as what I am doing. The whole setup is tied to the specific EC2 instance and the directory structure on it, making it somewhat importable. 

This is usable but, there were still a few things bugging me about leaving the server in this state.

### Deployment Version 2

So this setup worked fine and fulfilled my original requirements. Serving the production assets off of the same server as a bunch of unrelated personal stuff was not sitting right with me. Fortunately, the site is just a directory full of static files, which opens up some other options for distribution.

A convenient way to serve static assets within AWS is by utilizing their s3 storage. With S3 you can create "buckets" 
which contain files to be accessed, be it publicly or privately. It's especially convenient for hosting static web pages though. AWS can produce a URL associated with the bucket with a few CLI commands, which can be used to access the site. 

You'll need to do a bit more work than that to put everything behind your own custom domain though, which you will probably want to do if the site is going to be public facing. You can achieve that by using their Cloudfront(AWS' CDN). That put's your static files in a bunch of data centers around the world for low-latency access, add TLS for security, and allows you to associate a custom domain.

I'm using the [Serverless](https://serverless.com/) framework to abstract AWS away a bit and provision resources. I'm not really getting that much value from it though, considering I could achieve something similar to what It's doing with a command or two via AWS's CLI. It's pretty much just creating the S3 bucket or replacing a bucket if one exists from a previous deployment and setting up some environment variables/logging. So it may or may not end up staying.

Regardless here are the relevant configs for the full deployment in their current state.
  
```yaml
# .travis.yml

language: node_js
node_js:
- stable
cache: npm
addons:
  apt: 
    packages:
      - awscli 
install:
- npm install
- npm run build
deploy: 
  skip_cleanup: true
  provider: script
  script: scripts/deploy.sh
  on:
branch: master
```
```yaml
# serverless.yaml

service: frontend

plugins:
  - serverless-finch

custom:
  client:
        distributionFolder: dist
        bucketName: frontend-dist
        indexDocument: index.html
        errorDocument: index.html 
provider:
  name: aws
  runtime: nodejs8.10
  stage: prod
region: us-east-1
```

```javascript
// package.json
{
  "name": "malinoskj2.dev",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "preserve": "./scripts/get_posts.sh",
    "serve": "vue-cli-service serve",
    "build": "./scripts/get_posts.sh && vue-cli-service build",
    "lint": "vue-cli-service lint",
    "deploy": "sls client deploy",
    "analyze": "webpack-bundle-analyzer dist/stats.json",
    "config-creds": "serverless config credentials --provider aws --key $SERVERLESS_KEY --secret $SERVERLESS_SECRET"
},
...
```
```bash
# deploy.sh

#!/bin/bash

npm install -g serverless && 
npm run config-creds &&
echo "Y" | npm run deploy 

aws configure set aws_access_key_id $travis_cloudfront_key &&
aws configure set aws_secret_access_key $travis_cloudfront_secret &&
aws configure set preview.cloudfront true

aws cloudfront create-invalidation \
--distribution-id ${cloudfront_id} \
--paths "/*" >/dev/null 2>&1 
```

Deploy.sh is run by Travis when commits are pushed to master and build successfully. First, the script provisions the necessary resources on AWS via Serverless. Once the resources are provisioned and the newly built static files are in place, it invokes AWS' CLI to invalidate the Cloudfront distribution associated with the site's domain. This ensures Cloudfront isn't serving stale content for very long, and users can access the updated files.

### Wrapping up

So yeah there is a bit going on here, and there's still a bit of work to be done. Hopefully, some of this was of interest. Expect some more focused posts coming soon.

\- Jesse
