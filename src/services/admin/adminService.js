import helpers from "../../utils/helpers";
import User from "../../models/user";

const getUsers = async (page, limit) => {
  return helpers.paginate(User, {}, page, limit);
};

export default { getUsers };
