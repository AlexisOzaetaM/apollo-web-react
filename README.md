# 🚀 Apollo

[![](https://img.shields.io/badge/npm%20package-6.13.4-red)](https://nodejs.org/es/download/)
[![](https://img.shields.io/badge/Node%20JS-12.14.1-green)](https://nodejs.org/es/download/)
[![](https://img.shields.io/badge/React%20JS-16.12.0-blue)](https://es.reactjs.org)

## Contributions from the original project
![imagen](https://user-images.githubusercontent.com/42324882/131198265-08a8d51a-3291-4eed-9afa-ba675d847543.png)


## Index
* Installations
    * [Visual Studio Code](#VSC) 
    * [Node JS & npm](#Node JS)
* Configurations
    * [Config your git](#Config)
    * [How to clone the repo](#Repo)
* Test the project
    * [How to run the project](#Run)
* Our Git workflow
    * [Naming branches](#Naming)
    * [Creating branches](#Creating)
    * [Merge Request](#MR)

<a name="VSC"><a/>
## Visual Studio Code
You can download the IDE Visual Studio Code [here](https://code.visualstudio.com). 

<a name="Node JS"><a/>
## Node JS
Go to [this page](https://nodejs.org/download/release/v12.14.1/), there you'll find a list with different options, choose ***node-v12.14.1-x64.msi*** or ***node-v12.14.1-x86.msi***. This file install both Node JS and npm, 12.14.1 and 6.13.14 respectively.
After you download it execute the file and install it.

To be sure that actually are installed go to Command Line and use the next commands: **npm -v** and **node -v**, if the installation was successfull then will appear its version number installed.

<a name="Config"><a/>
## Config your git
Execute the follow commands:
```
git config --global user.name "[Name]"
git config --global user.email "[Your account e-mail]"
```

<a name="Repo"><a/>
## How to clone the repo
*  Open the command line and go to C://
*  Execute the follow commands:
```
git init
git clone https://gitlab.com/AlexisOzaetaM/apollo-web-react.git
cd apollo-web-react
npm install
```

<a name="Run"><a/>
## How to run the project
In **command line** go to project folder and execute the follow command:
```
npm start
```

<a name="Naming"><a/>
## Naming branches
There are many types of tasks in a project. Each task has a prefix wich we'll use it to name the branches.
The next table show us the types of tasks, its prefix and an example of branch name.

|   Task  | Prefix |  Example  |                              Obvservation                             |
|:-------:|:------:|:---------:|:---------------------------------------------------------------------:|
| Develop |   DEV  |  DEV-235  | This task is for any kind of develop for the app.                     |
|   Bug   |   BUG  |   BUG-32  | This task is only used when a bug will be fixed.                      |
|  Hotfix | HOTFIX | HOTFIX-99 | This task is only used when a critical bug will be fixed immediately. |

<a name="Creating"><a/>
## Creating branches
All the branches will be created from the **develop branch**.
Follow the next steps:
1.  Create your branch in GitLab from the **develop branch** and name it according to the task prefix and the number of the task.
2.  In your **Git bash** go to the **develop branch** and execute `git pull` to pull the latest changes (and the branches created).
3.  Checkout to your new branch and GO TO WORK, SLAVE!

<a name="MR"><a/>
## Merge Request
A Merge Request is a petition to merge your changes to the **develop branch**. However, that changes have to be accepted for a Mainteiner.
The Mainteiner can reject your changes if consider that it can improve.
Follow the next steps:
1.  In your File Explorer go to *apollo-web-react folder*
2.  Right click an select Git GUI Here
* **Staged changes Area**
    * Here appear the files that you will commit.
* **Unstaged changes Area**
    * Here appear the files that you created, deleted and modified.
    * You can add files to **staged changes area** doing click on the file's icon.
3.  Add all the files that you want to commit.
4.  In **Commit message Area** write a short description of what did you do.
5.  Click on **Commit button*.
6.  Click on **Push button**.
7.  Select **your branch**.
8.  And finally click on **Push button**.

Now, you have to create the **Merge Request** in GitLab.
1.  Add the title: [Branch name] | [Short description] (e.g. DEV-37 | Login component and new icon)
2.  Add a description explaining briefly what did you do.
3.  Select a Mainteiner wich will accept o reject your MR.
4.  And finally create it.
