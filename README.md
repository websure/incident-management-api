# incident-management-api

CRUD API's for incident management

todo

design model api auth service mock users add webpack, remove read_env.js testing

later : user session management

incident

incident life flow

{ id:"", currentStatus:"", deleted:"true,false", activity:[ { timestamp:"",
assignee:"", statusFrom:"", statusTo:"" } ] }

https://stackabuse.com/building-a-rest-api-with-node-and-express/
https://www.toptal.com/nodejs/secure-rest-api-in-nodejs
https://wanago.io/2020/04/27/typescript-express-put-vs-patch-mongodb-mongoose/
steps

admin -> create , delete , assign incidents

any1 : can see the incidents acknowledge -> self assigned can self assign
incident

activity flow : only when assignee, status is changed, will save activity

user auth : all api calls wil have Authorization header. check with user token
for user type

create/delete only admin

axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

testing : // joi
https://dev.to/itnext/joi-awesome-code-validation-for-node-js-and-express-35pk
