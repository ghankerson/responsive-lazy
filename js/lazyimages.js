  var lazyLoad = {
      didScroll: true, // set to true initially to trigger the doImageLoad function's image load  on page load
      screenWidth: window.innerWidth,
      registerScrollListener: function() {
          var self = this;
          window.addEventListener('scroll', function() {
              self.didScroll = true;
          });
      },
      isInViewPort: function(ele) {
          var rect = ele.getBoundingClientRect();

          var visible = (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
              rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
          );
          return visible;
      },
      triggerImageLoad: function() {
          var self = this;
          setInterval(function() {
              self.doImageLoad(self);
              self.didScroll = false;
          }, 200);
      },
      doImageLoad: function(self) {
          if (self.didScroll) {
              var elements = document.querySelectorAll('div.lazy');
              var noScriptTag;
              for (var i = 0; i < elements.length; i++) {
                  if (self.isInViewPort(elements[i])) {
                      var noscriptTag = elements[i].children[0];
                      var img = document.createElement('img');
                      if (self.screenWidth > 0 && self.screenWidth <= 479) {
                          img.setAttribute("src", noscriptTag.getAttribute('data-src-sm'));
                      } else if (self.screenWidth > 479 && self.screenWidth <= 960) {
                          img.setAttribute("src", noscriptTag.getAttribute('data-src-med'));
                      } else {
                          img.setAttribute("src", noscriptTag.getAttribute('data-src-lrg'));
                      }
                      elements[i].appendChild(img);
                      elements[i].classList.remove('lazy')
                  }

              }
          }
      }
  };
  lazyLoad.registerScrollListener();
  lazyLoad.triggerImageLoad();