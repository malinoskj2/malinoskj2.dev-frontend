FROM node:11

WORKDIR /build
COPY . . 

RUN npm install && \
npm run build
CMD [ "cp", "-r" ,"/build/dist", "/done/dist" ] 
