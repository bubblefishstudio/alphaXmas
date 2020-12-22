# alphaXmas
This is a Hackathon project for 2020-2021 Creative Programming and Computing Course. The main purpose of this project is discover how to do **Music Melody Generation** using RNN modelling, together with the a graphical simulation of Christmas Tree Generation using L-system.

We build this project as we have interest in L-system and Deep Learning. They are really interesting! As the course 'Creative Programming and Computing' provide the Hackathon day on Dec.18th 2020. We decided to apply the knowledge into practice in this project.

The Slides for [Hackathon Pitch]()/ [Demo Presentation]() can be found here.

## Demo Video
[pic](link)

## Project Abstract
Our goal is to develop AlphaXmas, a generator of short monophonic christmas carol compositions based on a LSTM-RNN Model, since Recurrent Neural Networks have been researched to be effective for hand-writing recognition, speech recognition and music generation. We train the model from the dataset [The Hymns and Carols of Christmas](https://www.hymnsandcarolsofchristmas.com) of around 1k historical compositions in MusicXML/ABC Notation. We also analyze which is the most suitable representation of the input and output data of the network. Finally we generate several short music pieces using the trained model and convert them to audio for playback, and evaluate some aspects of the resulting works to observe if we obtained something interesting and meaningful.

After we get some music generation results from this model, we use processing.js and L-system to generate a 3d Christmas Tree Graphical Model on the webpage. Ideally, the audience can both listen to the newly-generated christmas melody composition and watch the tree model.

## Melody Generation


## Tree Generation
Picea abies is more commonly acknowledged and seen as a Christmas tree. They look beautifully like Towers. In order to model the shape, we are applying L-system in Processing to generate them. The algorithmic model for the growth of plants or other fractal-like organic forms, is using a rewriting mechanism to update simple stucture into more complex version by each iteration.

## Future Developments
The following are the aspects we would like to improve in the future:
- a more interactive human-computer interface
- a detail L-system modelling on Tree Generation: we would like to adjust the branches shape, rotaion angles, the decreasing width of the main tree trunk e.t.c

## Resources
1. Keras, Tensorflow, scikit-learn: Machine Learning in Python
2. [p5.js](https://p5js.org): JavaScript port of Processing
3. [Music21](http://web.mit.edu/music21/): Computer-aided Musicology Tool

## Bibliography
1. Massimiliano Z, Creative Programming and Computing, Course material of MSc in Music and Acoustic Engineering
2. Przemyslaw P, The Algorithmic Beauty of Plants(2004), Springer-Verlag
