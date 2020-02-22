Every project needs one right? So it seems that after a busy few weeks I finally had the time to carve out a little piece of the internet for myself. This blog is very much a work in progress (try using any of the buttons in the nav), also I can't promise the bright pink accents will stay, but hey, you are able to read this post right? It seems like as good a time as any to start posting.  

  
As far as content goes you can expect.    
* posts featuring stuff I am working on
* misc programming-related content including but not limited to
  * java, javascript, rust
  * web application application development
  * fun stuff

Be sure to keep an eye out for updates, I'm going to be finishing up some
interesting projects that I am excited to share with you in the near future.
Posts will be available on this page as well as directly via RSS @ [rss.malinoskj2.dev](https://rss.malinoskj2.dev).

### building a blog :black_nib:

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
