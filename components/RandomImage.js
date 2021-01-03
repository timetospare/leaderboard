const imageList = [
  "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters_opt/the-good-placewilliam-jackson-harper-chidi.jpg",
  "https://thumbs.gfycat.com/PerkyCarelessAbyssiniancat-max-1mb.gif",
  "https://i.kym-cdn.com/photos/images/newsfeed/000/538/731/0fc.gif",
  "https://www.pride.com/sites/default/files/guy-whistling-meme-gay.jpg",
  "https://i.imgur.com/tjbHi8b.gif",
  "https://recentnews.uk/wp-content/uploads/2020/10/0110fleetwoodmacskateboard.jpg",
  "https://media0.giphy.com/media/2Yc1CBBFBR3Glp1MVO/giphy-downsized-large.gif",
  "https://media3.giphy.com/media/l4JySAWfMaY7w88sU/source.gif",
  "https://telltaletv.com/wp-content/uploads/2020/12/Bridgerton-Punch.gif",
  "https://media2.giphy.com/media/xUOxf39VfumnMVPAMo/source.gif",
  "https://compote.slate.com/images/178e12df-efbd-423e-8487-745f04803593.gif?width=780&height=520&rect=756x504&offset=0x0",
  "https://media4.giphy.com/media/QZMzeEH4yVLji/giphy.gif",
  "https://i.imgur.com/uylZomz.gif",
  "https://media4.giphy.com/media/zPOErRpLtHWbm/giphy.gif?cid=ecf05e47xfvsfjyl3fk58zt32dm9rq737dh1k1fp62jmadam&rid=giphy.gif",
  "https://media4.giphy.com/media/l3nWcmMTILdzVjAWc/giphy.gif",
  "https://i.pinimg.com/originals/7e/bd/10/7ebd1036ac0c608dc5cf3a43095178d9.gif",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIW1oGgwMj0ze3jeGumuzx-19NJSO7uScLgg&usqp=CAU",
];

const returnImage = () => {
  return imageList[Math.floor(Math.random() * imageList.length)];
};

export default returnImage;
