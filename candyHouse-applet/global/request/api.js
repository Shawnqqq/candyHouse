const MODE = 'devlopment'   //开发环境
// const MODE = 'production'   //上线环境

const DEVELOPMENT_PREFIX = 'http://localhost:3000/api';
const PRODUCTION_PREFIX = 'https://www.candyhouse.com/api';

const VERSION = 'V0.0.1';  //版本型号
const PREFIX = (MODE === 'production') ? PRODUCTION_PREFIX : DEVELOPMENT_PREFIX;

export default {
  MODE: MODE,
  version: VERSION,
  login: `${PREFIX}/wxauth/login`,
  banner: `${PREFIX}/wxBanner`,
  wxClassify: `${PREFIX}/wxClassify`,
  wxPoster: `${PREFIX}/wxPoster`,
  wxColumn: `${PREFIX}/wxColumn`,
  wxCategory: `${PREFIX}/wxCategory`,
  wxRecommend: `${PREFIX}/wxRecommend`,
  wxLanding: `${PREFIX}/wxLanding`,
  wxgoods: `${PREFIX}/wxgoods`,
  wxCart: `${PREFIX}/wxCart`,
  wxCartReduce:`${PREFIX}/wxCartReduce`,
  wxCartAdd: `${PREFIX}/wxCartAdd`,
  wxCartDel: `${PREFIX}/wxCartDel`
}