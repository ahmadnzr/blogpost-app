const moment = require("moment");

class BaseView {
  formatDate(date) {
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  }
}

module.exports = BaseView;
