const fs = require('fs/promises');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'goals.json');

const ensureDataFile = async () => {
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, '[]', 'utf8');
  }
};

const readGoals = async () => {
  await ensureDataFile();
  const raw = await fs.readFile(dataFilePath, 'utf8');

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeGoals = async (goals) => {
  await ensureDataFile();
  await fs.writeFile(dataFilePath, JSON.stringify(goals, null, 2), 'utf8');
};

module.exports = {
  readGoals,
  writeGoals,
};