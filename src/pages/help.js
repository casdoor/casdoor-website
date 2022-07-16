import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

function Help() {
  return (
    <Layout title="Help" description="Help Page" styles={{padding: '19px',}}>

      <div className="container text--center">
      <br />
        <br />
        <h1><Translate>Need help?</Translate></h1>
        <Translate>If you need help with Casnode, you can try one of the mechanisms below.</Translate>
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col">
            <h2><Translate>Forum</Translate></h2>
            <Translate>Discuss with maintainers or share your experience about Casdoor on</Translate> <a href="https://forum.casbin.com"><Translate>Casdoor Forum</Translate></a>.
              </div>
              <div className="col">
                <h2><Translate>Gitter</Translate></h2>
                <Translate>You can join the conversation on</Translate> <a href="https://gitter.im/casbin/casdoor"><Translate>Gitter</Translate></a> <Translate>for contributing help.</Translate>
              </div>
              <div className="col">
                <h2><Translate>Tencent QQ</Translate></h2>
                <Translate>You can contact us by joining the QQ group:</Translate> <a href="https://qm.qq.com/cgi-bin/qm/qr?k=SCBnKNj_1ljeXFT2dk8cwoGQwc5lFy8l&jump_from=webapi">645200447</a>.
              </div>
              <div className="col">
                <h2>Github</h2>
                <Translate>At our</Translate> <a href="https://github.com/casdoor/casdoor"><Translate>GitHub repo</Translate></a><Translate>, browse and submit</Translate> <a href="https://github.com/casdoor/casdoor/issues">issues</a> or <a href="https://github.com/casdoor/casdoor/pulls">pull requests</a> <Translate>for bugs you find or any new features you may want implemented.</Translate>
              </div>
              </div>
              </div>
              <br />
              <br />
    </Layout>
  );
}

export default Help;