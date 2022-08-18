((window.gitter = {}).chat = {}).options = {
  room: 'casbin/casdoor',
};

(function () {
  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  s1.src = 'https://sidecar.gitter.im/dist/sidecar.v1.js';
  s0.parentNode.insertBefore(s1, s0);
})();

const id = setInterval(function(){
  const gitterCollapseButton = document.getElementsByClassName('gitter-open-chat-button');
  if(gitterCollapseButton.length > 0) {
    gitterCollapseButton[0].style.backgroundColor = "#443d80";

    gitterCollapseButton[0].addEventListener("click", function(){
      const gitterEmbedClass = document.getElementsByClassName('gitter-chat-embed');
      gitterEmbedClass[0].style.top = "60px";
    });

    clearInterval(id);
  }
});
