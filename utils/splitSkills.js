export const splitSkills = skills =>
  skills.split(',').reduce((acc, skill) => {
    acc.push({ name: skill.trim() });
    return acc;
  }, []);
