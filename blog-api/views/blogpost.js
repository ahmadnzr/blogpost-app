const BaseView = require("./base");

class BlogpostView extends BaseView {
  constructor({ id, title, content, User, createdAt, updatedAt }) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.User = User;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      createdAt: this.formatDate(this.createdAt),
      updatedAt: this.formatDate(this.updatedAt),
      user: {
        id: this.User.id,
        name: this.User.name,
        email: this.User.email,
      },
    };
  }
}

module.exports = BlogpostView;
