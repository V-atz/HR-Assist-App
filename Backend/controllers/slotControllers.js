const Slot = require("../models/slotSchema");

const handleCreateSlot = async (req, res) => {
  try {
    const { startTime, endTime, date } = req.body;
    
    const startDate = new Date(`${date} ${startTime}`);
    const endDate = new Date(`${date} ${endTime}`);
    console.log(startDate, endDate)
    
    // Collide check
    const existingSlot = await Slot.findOne({
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    if (existingSlot) {
      return res.status(400).json({ message: "Slot already exists" });
    }

    // Create new slot
    await Slot.create({ date, startTime: startDate, endTime:endDate});
    res.status(201).json({ message: "Slot created successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleGetSlots = async (req, res) => {
  try {
    const { date } = req.params; 

    const slots = await Slot.find({ date });

    if (slots.length === 0) {
      return res.status(404).json({ message: "No slots found for this date" });
    }

    res.status(200).json(slots); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { handleCreateSlot, handleGetSlots };
