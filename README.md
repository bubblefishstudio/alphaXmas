# alphaXmas
This is a Hackathon project for 2020-2021 Creative Programming and Computing Course. The main purpose of this project is to discover how to do **Music Melody Generation** using RNN modelling, together with the a graphical simulation of Christmas Tree Generation using L-system.

We build this project as we have interest in L-system and Deep Learning. They are really interesting! As the course 'Creative Programming and Computing' provide the Hackathon day on Dec.18th 2020. We decided to apply the knowledge into practice in this project.

The Slides for [Hackathon Pitch](/docs/pitch.html)/ [Demo Presentation](/docs/demo.html) can be found here.

The final presentation for this project is on Sep.8th 2021. We have updated the the visualization of the Christmas Tree, showing a better modelling and development of this 3D Tree.

## Demo Video
[![demo video thumbnail](/docs/pic/display.png)](https://youtu.be/zo2jU0MRttI)

The latest video will be available soon.

## Project Abstract
Our goal is to develop AlphaXmas, a generator of short monophonic christmas carol compositions based on a LSTM-RNN Model, since Recurrent Neural Networks have been researched to be effective for hand-writing recognition, speech recognition and music generation. We train the model from the dataset [The Hymns and Carols of Christmas](https://www.hymnsandcarolsofchristmas.com) of around 1k historical compositions in MusicXML/ABC Notation. We also analyze which is the most suitable representation of the input and output data of the network. Finally we generate several short music pieces using the trained model and convert them to audio for playback, and evaluate some aspects of the resulting works to observe if we obtained something interesting and meaningful.

After we get some music generation results from this model, we use processing.js and L-system to generate a 3d Christmas Tree Graphical Model on the webpage. Ideally, the audience can both listen to the newly-generated christmas melody composition and watch the tree model.

## Creative Project Design
"Art as part of the technological revolution."
We want to not only showing a technical solution of a problem but also a beautiful experience to the final user. And this creative project follows the according steps: Concepting -> Design -> Prototyping(Hackathon Day) -> Production: Final Release.

## Melody Generation
Accroding to the collected dataset, we did melodic analysis using Music21. Then we appled LSTM-RNN model to generate a sequence of melody(pitch, duration) as output.
![model](/docs/pic/model.png)


## Tree Generation
Picea abies is more commonly acknowledged and seen as a Christmas tree. They look beautifully like Towers. In order to model the shape, we are applying L-system in Processing to generate them. The algorithmic model for the growth of plants or other fractal-like organic forms, is using a rewriting mechanism to update simple stucture into more complex version by each iteration.

- L-system
Rewriting mechanism in L-system defines a complex object like natural plants by successively replacing part of a simple initial object with a set of rewriting rules/production rules.

In the graphical view, the audience can see the growing of a Picea abies tree growing from the initial stage to its most complex stage.

- Cylindrical Model
Spiral patterns are common in natural plants which can be described by models with positioning the components along a nelix on the surface of a cylindar.

In our case, there are two parts of our model uses the spiral patterns: the position of the branches growing out of the tree trunk, and, seconderly, the position of the leaves on all the branches.

- Turtle Geometry

In order to paint on the processing canvas effienciently,.....


## Future Developments
The following are the aspects we would like to improve in the future:
- a more interactive human-computer interface
- a detail L-system modelling on Tree Generation: we would like to adjust the branches shape, rotaion angles, the decreasing width of the main tree trunk e.t.c

## Resources
1. [Keras](https://keras.io), [Tensorflow](https://www.tensorflow.org), [scikit-learn](https://scikit-learn.org/): Machine Learning in Python
2. [p5.js](https://p5js.org): JavaScript port of Processing
3. [Music21](http://web.mit.edu/music21/): Computer-aided Musicology Tool

## Bibliography
1. Massimiliano Z, Creative Programming and Computing, Course material of MSc in Music and Acoustic Engineering
2. Przemyslaw P, The Algorithmic Beauty of Plants(2004), Springer-Verlag
3. James Scott Hannan, Regina, Saskatchewan, Parametric L-systems and Their Application to The Modelling and Visualization of Plants(1992)
