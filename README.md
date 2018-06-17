* find(fn) 在当前group中递归查找满足fn的shape或group
* findAll(fn) 在当前group中递归查找所有满足fn的shape和group
* findById(id) 在当前group中递归查找id匹配的shape或group
* findBy(fn) 接口已废弃
* find(id) 接口已废弃
* arrow 箭头设置
* arrow 是否显示箭头 ture / false
    * 支持定义Marker形状的箭头，箭头中心位于线段的端点
    ```js
    canvas.addShape('path', {
      attrs: {
        startArrow: new Marker({
           attrs: { ... }  
        })
      }
    });
    ```
* arrow 箭头设置
* arrow 是否显示箭头 ture / false
    * 支持定义Marker形状的箭头，箭头中心位于线段的端点
    ```js
    canvas.addShape('line', {
          attrs: {
            startArrow: new Marker({
               attrs: { ... }  
            })
          }
        });
    ```
      startArrow: true, 
      arrow: true,                                             // 显示箭头
      startArrow: true, 
      arrow: true,                                             // 显示箭头
