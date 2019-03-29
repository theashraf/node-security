# Node.js Security

This repo is for practicing the Node.js security practices mentioned in this [course](https://www.linkedin.com/learning/node-js-security)

## Maintain Package Dependencies

Let's explore what commands are available to maintain our dependencies, therefore making our application more secure. This is one of the biggest item you need to constantly work on in order to properly secure applications built with node.js. There are reasons why dependencies are updated,and sometimes the cause of their update is due to recently found vulnerabilities in the code. So since we rely on these packages, we need to make sure our application is also up to date, and therefore safer for our own users. Let's explore a few commands available to us. So let's bring up the terminal. Let's click on View, Integrated Terminal. And the first thing I want you to do is do an npm-v to check the version. You need to make sure to be at least at version six in order to use some of the commands that I'm gonna show you. So the first command that I'd like to use is npm audit. And this will go through all the dependencies that are installed in the node modules, and check if there's any issues. In this case, there is zero vulnerabilities. So we're good. Now the next one we need to do is to check if there's any packages that are outdated, so do npm outdated. And right now, the only package that is outdated is mongoose. So the latest version is 5.2.5, we're actually installed at 4.13.14, so what we're gonna do is update it to 5.2.5. Now there's two ways to update. One is to do npm update mongoose at the version you want. So 5.2.5, but this is working on and off, so from my experience, it's always better to do install. So I always recommend install as opposed to update. By doing this, npm install mongoose 5.2.5, this is going to install and save the version that we've installed in our package.json. So if we check here, now mongoose should be at the right version. So let's take a look, 5.2.5, we're good to go. Perfect. So the next thing we need to do, and this is purely from this particular project perspective, if you wanna continue working with this project, and want to leverage it for your own, make sure that the babel presetis at environment and not es2015, that has been deprecated. So what we're gonna do it actually do that right now, and make sure we are up to date. So what I'm gonna do is npm uninstall, and this is good practice when you want to uninstall things and so on, so forth. So uninstall babel preset es2015, save dev. And this will remove it from here, and then what we need to do is install the babel preset ENV for environment, let's make sure we install and not uninstall it. And save it in the dev as well. So now we got it here, we need to change also the babel RC to environment. Save that, and we're good to go. Now if we start the actual project here, you're gonna get a little warning that something has been deprecated. I'm gonna wait for it to show, so it says here that current URL string parser is deprecated, and will be removed in a future version. So right now you don't need to do anything about that, but the one thing that actually makes the application crash is the use mongoo client option is no longer necessary mongoose 5.X. So we need to remove it, so let's go into the index here, and remove this guy here. So basically what you need to do is removeall the options in this particular block of code here, so from line 11 where you have the comma, all the way down to the closing curly brace here. Like so. And now the only thing we should see is that deprecated warning here. So this is something that we're not gonna do in this course. Okay, so this is how you install, uninstall,update your dependencies, and do some audit on them. So let's move on.

## Data handling with type and validation

When handling data on your server the best first line of defense is to do validation and type assertion. This way, the data sent is already sanitized to be of a certain type and you avoid sending dangerous scripts to the server. Let me demonstrate. So go into the project and open the folder called models and then click on crmModel. And this is where we actually define the type of our schema. So right now if you take a look at firstName,lastName, email, company, phone, and created_date we expect a type. So we expect a type of String, String, and email for Stringand then Number for phone and then we expect a type Date for the created_date. So if we pass a number to firstName, right there and then it's gonna break. So we're not gonna be able to pass a number to String or a string to the Number here. So this is one of the first thing you need to do. So when you define your schema, make sure you define a type for each of your propertiesinside of your object that you are passing and sending to the server. Now the second thing you could do is use further validation with a library called validator.js, so we validate the data further when you send it to the server. So not only we can expect an actual type, but what exactly we expect. So no more than a specific number of characters or for the email we expect of type email and so on and so forth. So let's go into the actual site where we have validator. So you can go to github.com/chriso/validator.js.And if you scroll down here, it's very easy to get validator up and running inside of your server. So you import validator from validator. And then inside of your data, you simply use validator.isEmail and then pass the value or pass the variable that holds the value. So in this case we'd pass, for example, email inside of this particular validation here. So if we put this into practice in our application here, it would be in the controllers. So if we click on the folder controller, and then open up crmController, then what we do is when we add new data to the server, we would sort of do an if statement or a conditional statement. If it doesn't meet this requirements, then do not pass the data to the server. Otherwise, if it meets the requirementsthen you can go ahead and save that new contact to the server. So it'd go something like this. So right below your new contact here,you would do something like this where you would write an if statement, something like that where if, validator.isEmail, and then pass all the new contacts so the new contact body it would have, newContact.email. So it would have an email inside of that object. So if that is not an email then, well actually in this case it would be if this is an email, then run the code below. In this case, run the code below. And then otherwise, do something ofconsole.log something like not an email or whatever is the error message. So you get the point. So basically what we would need to do is wrap this particular saving of data inside of our serverinside of an if statement and the run conditional statements to validate that whatever the data is inside is of particular type. So there is an email and so on and so forth and then you can save it.So that's how how you would actually validate further. And you can even go as far as actually validate more and put more conditionals yourself, so write your own code. So contact email needs to have that many characters and so on and so forth. So this is how you would actually run some validation before you actually save it in the controller. So you wanna make sure you have these parameters inside of your application to make sure that whatever you're sending to your database is something that is safe, is not going to be injecting malicious code and so on and so forth. So let's save this and move on.
