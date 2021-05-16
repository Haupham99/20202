import {notification} from "./../services/index";

let getNotification = async function (req, res) {
  let notificationArr = await notification.getNotification(req, res);
  let notificationArrNotRead = await notificationArr.filter(item => item.isRead == false);
  res.status(200).send({"data": notificationArr, "total": notificationArrNotRead.length});
};

let postNotification = async function (req, res) {
  await notification.postNotification(req, res);
  res.status(200).send({"message": "post notification success"});
};

let postReadNotification = async function (req, res) {
  await notification.postReadNotification(req, res);
  res.status(200).send({"message": "post read notification success"});
};

module.exports = {
    getNotification: getNotification,
    postNotification: postNotification,
    postReadNotification: postReadNotification
};