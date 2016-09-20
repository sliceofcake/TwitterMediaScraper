# TwitterMediaScraper  
For downloading all of a particular Twitter user's media, specifically static images.  
  
Required:  
L> Web browser  
L> Access to [twitter.com](twitter.com)  
L> One of the following:  
L> L> Apple OS and ability to use Automator.app to run a "workflow" [instructions provided]  
L> L> Apple OS and ability to use the command-line [link to instructions provided]  
L> L> Windows and ability to use the command-line [link to instructions provided]  
Recommended:  
L> Latest version of Apple OS  
L> Latest version of Chrome web browser  
  
Downloading the images  
(1) Set your browser's automatic downloads folder to the folder that you want all the images to download into.  
(2) Navigate to a twitter user's media feed, such as https://twitter.com/[[[USERNAME_HERE]]]/media  
(3) Open your browser's JavaScript Console for that page.  
(4) Paste in the text from twitterScrape.js and run it. You will see a large description box placed at the top of the page. Read through it, and eventually click the relevant link/button to run the scraper, once you're ready.  
(5 [Apple OS Automator]) Relocate your downloaded images to their own folder, if they aren't already, and open twitterExtensionChop.workflow. Click the "Run" action [likely a button at the top]. This will bring up an OS file selection prompt. Navigate to the folder you just made, select all the images [command+A], and proceed [likely a "Choose" button at the bottom]. That workflow chopped off the "-orig" from all the files and now all the images should be easily viewable.  
(5 [Apple OS command-line]) Relocate your downloaded images to their own folder, if they aren't already. Open a command-line for that folder. Run  
for filename in *.jpg-orig;do mv "$filename" "${filename/.jpg-orig/.jpg}";done;for filename in *.png-orig;do mv "$filename" "${filename/.png-orig/.png}";done  
to chop off the "-orig" from all the files. Now all the images should be easily viewable.  
(5 [Windows command-line]) Relocate your downloaded images to their own folder, if they aren't already. Open a command-line for that folder. Run  
rename *.jpg-orig *.jpg;rename *.png-orig *.png  
to chop off the "-orig" from all the files. Now all the images should be easily viewable.  
  
[see the JavaScript Console Help section of [https://github.com/sliceofcake/TechnicalHelp](https://github.com/sliceofcake/TechnicalHelp)]  
See the Command-Line Help section of [https://github.com/sliceofcake/TechnicalHelp](https://github.com/sliceofcake/TechnicalHelp)  
  
Use case  
There are some artists that I follow on Twitter. Every day, I go through the previous 24 hours looking for drawings that I really like, and go through a lengthy process of clicking and typing in order to route those new images to folders, per artist, on my local computer. That's actually not too bad, because I need to look through the images anyway to decide which I want to save. The problem is when I find a new artist, with something like 500 to 1000 past images. It takes literally hours to look through all of them and go through the same saving process, which runs into a bunch of Twitter's idiosyncrasies. It would be much faster if I was able to download all the images automatically, then manually go through them, in an image viewer of my choice [a better one], to quickly delete the ones that I don't want. A multi-hour process just got reduced to a multi-minute process. I really like some artists, but spending three hours going through their images on Twitter in a factory-like manner is really rough.  
  
Everything that could go wrong, within reason  
• Nothing is downloading : Web browsers are really fickle about how they allow multiple-downloads from a page. The first time you're asked if you want to allow multiple-downloads, it's okay, but once you negatively dismiss that prompt, I have no clue how to get it back so that you can positively accept it. It also seems that Paranoid-Mode tabs have issues more often with multiple-downloads being disabled. Try looking up how to allow multiple-downloads for a page in your specific web browser.  
• Something exploded with or without flame-related damage : Downloading an extremely high number of files in staggered parallel will probably cause some scary things to happen. With any luck though, as few positive things should happen: (a) Twitter should throttle your network traffic...hopefully, rather than placing a block on you (b) Your browser should throttle the number of concurrent downloads and form an orderly queue | but at the same time, some negative things should happen: (a) Your browser may cap off the queue at some number, effectively dropping random images that should have been downloaded [note that in your JavaScript Console, after the scraper has completed, you will see a printout of the total number of encountered links. if this number doesn't match the total number of downloaded files, something went wrong]  
• Before each file downloads, I need to specify where it should download to on my computer : You're going to want to set up automatic downloads-without-asking in your web browser. This changes per web browser, and changes over time. Please look up how to download images without being prompted on download location for your specific web browser.  
  
Help me!  
If you have any questions, go ahead and ask here on GitHub. I believe the "Issues" tab here on GitHub is what we're looking for. I think. If you have some other way of getting in touch with me, it's up to you.  