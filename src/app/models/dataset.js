var natural = require('natural');

        classifier = new natural.BayesClassifier(),

        classifier.addDocument("hello", 'hellosir');

        classifier.addDocument("hi", 'hellosir');

        classifier.addDocument("hey hi", 'hellosir');

        classifier.addDocument("hey hello", 'hellosir');

        classifier.addDocument("greetings greet", 'hellosir');

        classifier.addDocument("goodbye see you", 'goodbyesir');

        classifier.addDocument("see you soon", 'goodbyesir');

        classifier.addDocument("bye see you have to go", 'goodbyesir');

        classifier.addDocument("goodbye", 'goodbyesir');

        classifier.addDocument("bye", 'goodbyesir');

        classifier.addDocument("you feel fine", 'imfine');

        classifier.addDocument("do you feel good", 'imfine');

        classifier.addDocument("how are you", 'imfine');

        classifier.addDocument("how are you feeling", 'imfine');

        classifier.addDocument("how are you doing", 'imfine');

        classifier.addDocument("you are alright all right", 'imfine');

        classifier.addDocument("fine", 'imfine');

        classifier.addDocument("feel", 'imfine');

        classifier.addDocument("can you play music", 'music');

        classifier.addDocument("can you play something", 'music');

        classifier.addDocument("can you play some stuff", 'music');

        classifier.addDocument("can you put some music", 'music');

        classifier.addDocument("say anything to my friends", 'hellofriends');

        classifier.addDocument("hi to my friends", 'hellofriends');

        classifier.addDocument("this are my friends", 'hellofriends');

        classifier.addDocument("these friends", 'hellofriends');

        classifier.addDocument("anything to my friends", 'hellofriends');

        classifier.addDocument("want meet my mate", 'hellomeet');

        classifier.addDocument("want meet my friend mate", 'hellomeet');

        classifier.addDocument("want meet him", 'hellomeet');

        classifier.addDocument("want meet her", 'hellomeet');

        classifier.addDocument("who i am me", 'knowme');

        classifier.addDocument("who its me", 'knowme');

        classifier.addDocument("what's my name", 'knowme');

        classifier.addDocument("my name", 'knowme');

        classifier.addDocument("name", 'knowme');

        classifier.addDocument("which are my name", 'knowme');

        classifier.addDocument("do you know my name", 'knowme');

        classifier.addDocument("do you know who i am", 'knowme');

        classifier.addDocument("stop music", 'stopmusic');

        classifier.addDocument("stop the music", 'stopmusic');

        classifier.addDocument("identify", 'identMe');

        classifier.addDocument("identify me", 'identMe');

        classifier.addDocument("recognize", 'identMe');

        classifier.addDocument("recognize me", 'identMe');

        classifier.addDocument("id", 'identMe');

        classifier.addDocument("id me", 'identMe');

        classifier.addDocument("identification", 'identMe');

        module.exports = classifier.train()
        
         

    
