const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// const ideas = [
//   {
//     id: 1,
//     text: 'Positive Newsletter',
//     tag: 'Technology',
//     username: 'TonyStark',
//     date: '2022-01-02',
//   },
//   {
//     id: 2,
//     text: 'Milk Cartons that turn a different color the older that your milk is getting',
//     tag: 'Inventions',
//     username: 'SteveRogers',
//     date: '2022-01-02',
//   },
//   {
//     id: 3,
//     text: 'Build muscle app',
//     tag: 'Software',
//     username: 'BruceBanner',
//     date: '2022-01-02',
//   },
// ];

//get all ideas
router.get('/', async (req, res) => {
  // res.json({success: true, data: ideas});
  try {
    const ideas = await Idea.find();
    res.json({success: true, data: ideas});
  } catch (error) {
    res.status(500).json({success: false, error: 'Something went wrong.'});
    console.log(error);
  }
});

//get single idea
router.get('/:id', async (req, res) => {
  // const idea = ideas.find((idea) => idea.id === +req.params.id);

  // if (!idea) {
  //   return res.status(404).json({success: false, error: 'Resource not found'});
  // }
  // res.json({success: true, data: idea});

  try {
    const idea = await Idea.findById(req.params.id);
    res.json({success: true, data: idea});
  } catch (error) {
    res.status(500).json({success: false, error: 'Something went wrong.'});
    console.log(error);
  }
});

//add an idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  // ideas.push(idea);

  // console.log(idea);

  //   res.send(idea);
  // res.json({success: true, data: idea});

  try {
    const savedIdea = await idea.save();

    res.json({success: true, data: savedIdea});
  } catch (error) {
    res.status(500).json({success: false, error: 'Something went wrong'});
    console.log(error);
  }
});

//update aka put
router.put('/:id', async (req, res) => {
  // const idea = ideas.find((idea) => idea.id === +req.params.id);

  // if (!idea) {
  //   return res.status(404).json({success: false, error: 'Resource not found'});
  // }

  // //update text and tag
  // idea.tag = req.body.tag;
  // idea.text = req.body.text;

  // res.json({success: true, data: idea});
  const idea = await Idea.findById(req.params.id);

  try {
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        {new: true},
      );
      return res.json({success: true, data: updatedIdea});
    }

    //usernames dont' match
    res.status(403).json({
      success: false,
      error: "You aren't authorized to remove this resource.",
    });
    console.log(error);
  } catch (error) {
    res.status(500).json({success: false, error: 'Something went wrong'});
    console.log(error);
  }
});

//delete request try on your own
router.delete('/:id', async (req, res) => {
  // const idea = ideas.find((idea) => idea.id === +req.params.id);

  // if (!idea) {
  //   return res.status(404).json({success: false, error: 'Resource not found'});
  // }

  // //my solution
  // //   ideas = ideas.filter((idea) => idea.id !== +req.params.id);

  // //solution 2
  // const index = ideas.indexOf(idea);
  // console.log(index);
  // ideas.splice(index, 1);

  // res.json({success: true, data: {}});
  try {
    const idea = await Idea.findById(req.params.id);

    //match the usernames
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({success: true, data: {}});
    }

    //usernames dont' match
    res.status(403).json({
      success: false,
      error: "You aren't authorized to delete this resource.",
    });
  } catch (error) {
    res.status(500).json({success: false, error: 'Something went wrong'});
    console.log(error);
  }
});

module.exports = router;
