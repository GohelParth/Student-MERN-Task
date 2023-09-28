import bcrypt from "bcrypt";

const hash = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);

  return hashPassword;
};

const compare = (password, db_password) => {
  const comaprePassword = bcrypt.compareSync(password, db_password);

  return comaprePassword;
};

export { hash, compare };
