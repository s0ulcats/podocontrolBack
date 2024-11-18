import Recording from '../models/Recording.js';

export const getRecordings = async (req, res) => {
  try {
    const recordings = await Recording.find().sort({ date: 1, time: 1 });
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recordings', error });
  }
};

export const createRecording = async (req, res) => {
  const { username, phone, date, time, procedure } = req.body;

  if (!username || !phone || !date || !time || !procedure) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newRecording = new Recording({
      username,
      phone,
      date,
      time,
      procedure,
    });

    await newRecording.save();
    res.status(201).json(newRecording);
  } catch (error) {
    res.status(500).json({ message: 'Error creating record', error });
  }
};
