const Goal = require('./models/Goal');

const refundRules = [
  { tag: 'bottle', region: 'Alberta', moreThanLiter: false, refund: 0.10 },
  { tag: 'bottle', region: 'Alberta', moreThanLiter: true, refund: 0.25 },
];

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    return res.status(200).json(goals);
  } catch (err) {
    console.error('Get goals error:', err);
    return res.status(500).json({ message: 'Failed to fetch goals' });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Goal title is required' });
    }

    const goal = await Goal.create({
      title: title.trim(),
      bags: [],
    });

    return res.status(201).json(goal);
  } catch (err) {
    console.error('Create goal error:', err);
    return res.status(500).json({ message: 'Failed to create goal' });
  }
};

exports.addBag = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Bag name is required' });
    }

    const goal = await Goal.findById(goalId);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    goal.bags.push({
      name: name.trim(),
      bottleCollections: [],
    });

    await goal.save();

    return res.status(201).json(goal);
  } catch (err) {
    console.error('Add bag error:', err);
    return res.status(500).json({ message: 'Failed to add bag' });
  }
};

exports.addBottleCollection = async (req, res) => {
  try {
    const { goalId, bagId } = req.params;
    const { tag, region, moreThanLiter, bottleCount } = req.body;

    if (!tag) {
      return res.status(400).json({ message: 'Tag missing' });
    }

    if (!region) {
      return res.status(400).json({ message: 'Region missing' });
    }

    if (typeof moreThanLiter !== 'boolean') {
      return res.status(400).json({ message: 'moreThanLiter must be true or false' });
    }

    if (!Number.isInteger(bottleCount) || bottleCount <= 0) {
      return res.status(400).json({ message: 'bottleCount must be a positive integer' });
    }

    const rule = refundRules.find(
      (item) =>
        item.tag.toLowerCase() === tag.toLowerCase() &&
        item.region.toLowerCase() === region.toLowerCase() &&
        item.moreThanLiter === moreThanLiter
    );

    if (!rule) {
      return res.status(404).json({ message: 'No matching refund rule found' });
    }

    const goal = await Goal.findById(goalId);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const bag = goal.bags.id(bagId);

    if (!bag) {
      return res.status(404).json({ message: 'Bag not found' });
    }

    const refundAmount = rule.refund * bottleCount;

    bag.bottleCollections.push({
      tag,
      region,
      moreThanLiter,
      bottleCount,
      refundPerBottle: rule.refund,
      refundAmount,
    });

    await goal.save();

    return res.status(201).json(goal);
  } catch (err) {
    console.error('Add bottle collection error:', err);
    return res.status(500).json({ message: 'Failed to add bottle collection' });
  }
};