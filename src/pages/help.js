import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

function Help() {
  return (
    <Layout title="Help" styles={{padding: '19px',}}>

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
            <Translate>Discuss with maintainers or share your experience about Casbin on</Translate> <a href="https://forum.casbin.com"><Translate>Casbin Forum.</Translate></a>
              </div>
              <div className="col">
                <h2><Translate>Gitter</Translate></h2>
                <Translate>You can join the conversation on</Translate> <a hrerf="https://gitter.im/casbin/Lobby"><Translate>Gitter</Translate></a> <Translate>for contributing help.</Translate>
              </div>
              <div className="col">
                <h2><Translate>Tencent QQ</Translate></h2>
                <Translate>You can contact us by joining the QQ group: 555019739.</Translate>
              </div>
              <div className="col">
                <h2>Github</h2>
                <Translate>At our</Translate> <a href="https://github.com/casbin/casdoor"><Translate>GitHub repo</Translate></a><Translate>, browse and submit</Translate> <a href="https://github.com/casbin/casdoor/issues">issues</a> or <a href="https://github.com/casbin/casdoor/pulls">pull requests</a> <Translate>for bugs you find or any new features you may want implemented.</Translate>
              </div>
              </div>
              </div>
              <br />
              <br />
    </Layout>
  );
}

export default Help;