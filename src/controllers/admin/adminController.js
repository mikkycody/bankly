import adminService from "../../services/admin/adminService";
import HttpStatus from "http-status";
import response from "../../utils/response/ResponseHandler";

const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getUsers(
      req.query.page ?? 1,
      req.query.limit ?? 10
    );
    return response(res, "All Users", HttpStatus.OK, users);
  } catch (error) {
    next(error);
  }
};

export { getUsers };
