# alphaXmas

This project, AlphaXmas, is a multimedia installation to bring the audience into an experience of watching a computer generated tree growing, with a computer generated music melody in the background. The growing plant is generated using a 3D model built from an L-system and the music melody is generated using a LSTM neural network. The generator of music melody is of short monophonic Christmas carol compositions based on a LSTM-RNN Model. We train the model using MusicXML/ABC Notation from the dataset, the Hymns and Carols of Christmas with around 1k historical compositions. 

This is a Hackathon project for 2020-2021 Creative Programming and Computing Course. 
The hackathon date on Dec.18th 2020, while the final presentation is on Sep.8th 2021.

## Project Links
Project is available here: https://alphaxmas.bubblefish.studio/

Available slides are here: [demo slides](/docs/Pitch.html)/[final slides](/docs/cpc_final.html) can be found here.

Also, a project thesis can he found [here](/docs/thesis.pdf).

## Creative Project Design
Creative Programming provides us the chance to design and develop a project to discover something interesting rather than something functional. Our goal is largely inspired by the beauty of computational creativity, we want to explore how to create a live graphical animation and live music in this project.

## Melody Generation
We did melodic analysis using Music21 and appled LSTM-RNN model to generate a sequence of melody(pitch, duration) as output.
![model](/docs/pic/model.png)

## Tree Generation
Picea abies is more commonly acknowledged and seen as a Christmas tree. In order to model the shape, we are applying L-system to generate them. The algorithmic model for the growth of plants or other fractal-like organic forms, is using a rewriting mechanism to update simple stucture into more complex version by each iteration.

- L-system
Rewriting mechanism in L-system defines a complex object like natural plants by successively replacing part of a simple initial object with a set of rewriting rules/production rules.

In the graphical view, the audience can see the growing of a Picea abies tree growing from the initial stage to its most complex stage.

- Cylindrical Model
Spiral patterns are common in natural plants which can be described by models with positioning the components along a nelix on the surface of a cylindar.

In our case, there are two parts of our model uses the spiral patterns: the position of the branches growing out of the tree trunk, and, seconderly, the position of the leaves on all the branches.

- Turtle Geometry

We are using a 3D turtle geometry to translate the L-system symbols into graphical animations.


## Future Developments
We would like to improve in the future:
- a more interactive human-computer interface
- smoothe animation
- better rendering

## Resources
1. [Keras](https://keras.io), [Tensorflow](https://www.tensorflow.org), [scikit-learn](https://scikit-learn.org/): Machine Learning in Python
2. [p5.js](https://p5js.org): JavaScript port of Processing
3. [Music21](http://web.mit.edu/music21/): Computer-aided Musicology Tool

## Bibliography
1. Massimiliano Z, Creative Programming and Computing, Course material of MSc in Music and Acoustic Engineering
2. Przemyslaw P, The Algorithmic Beauty of Plants(2004), Springer-Verlag
3. James Scott Hannan, Regina, Saskatchewan, Parametric L-systems and Their Application to The Modelling and Visualization of Plants(1992)
