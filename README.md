# big-pink-docs
A reader of your project's READMEs with display of relative age of README versus code in the directory.

## To set up the environmental variable on your computer
1.  cd ~
2.  Check if you have .bash_profile , if not touch .bash_profile
3.  vim .bash_profile
4.	GITHUB_KEY="token generated on github.com"; export GITHUB_KEY
5.	save and exit vim
6. 	You're done.
7.	No, really, you're done.

##Set Up Database
1. Create database "bigpinkdatabase" in Sequel Pro || mysqladmin create bigpinkdatabase -uroot
2. Run db-migrate up in bigpinkdocs directory.

##Fetch Data
1. Run node --harmony index.js
2. Hit this route: localhost:2434/get-data
3. Data should appear in db
