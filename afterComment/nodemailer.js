// 使用 Nodemailer 推送邮件通知
let nmCfg = {
  // SMTP Host
  host: '',
  // SMTP 端口
  port: 587,
  auth: {
    // SMTP 用户名
    user: "postmaster@YOUR_DOMAIN_NAME",
    // SMTP 密码
    pass: "YOUR_SMTP_PASSWORD", 
  },
};

// 邮件发送者，通常与 SMTP 用户名相同
let mailFrom = '';

function dayjs(timestamp) {
     let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
 if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
(async () => {
  // 用于推送通知给被回复人
  if (!$data.rpid) return false;
  let transporter = nodemailer.createTransport(nmCfg);
  
  let sitename = (await db.get("SITE_NAME")) || { value: "" };
  let sitelink = (await db.get("SITE_LINK")) || { value: "" };

  sitename = sitename.value;
  sitelink = sitelink.value;
  
  let info = await transporter.sendMail({
    from: mailFrom,
    to: $data.email,
    subject: `[${sitename}] 您的评论收到新回复`,
    html: `<p>您在 ${sitename} 上的评论收到新回复。</p><hr/><p>评论者 <a href="${$data.url}">@${$data.nickname}</a> 于 ${dayjs($data.timestamp)} 在回复中评论：</p><div>${$data.content}</div><hr/><p>如果需要查看更多详情，请<a href="${sitelink}${$id}">点击此处</a>查看。</p><p>${sitename}</p><p style="opacity: 0.8">Powered by <a href="https://github.com/detalkjs">Detalk.js</a></p>`,
  });
  
  console.log(info);
})();
