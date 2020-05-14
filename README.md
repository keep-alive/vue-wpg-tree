# VueWpgTree
## API
### tree props
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th style="width: 100px;">name</th>
            <th style="width: 50px;">type</th>
            <th style="width: 50px;">default</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>checkable</td>
          <td>Boolean</td>
          <th>false</th>
          <td>is or not cheackAble</td>
        </tr>
        <tr>
          <td>checkedkeys</td>
          <td>Arrary</td>
          <th></th>
          <td>checkedItem</td>
        </tr>
        <tr>
            <td>source</td>
            <td>Arrary</td>
            <th></th>
            <td>tree data</td>
        </tr>   
         <tr>
            <td>dropkeys</td>
            <td>Arrary</td>
            <th></th>
            <td>droped item</td>
        </tr>  
        <tr>
            <td>selectedkeys</td>
            <td>Arrary</td>
            <th></th>
            <td>selected item</td>
        </tr>
        <tr>
            <td>renderContent</td>
            <td>function(create,node)</td>
            <th></th>
            <td>add tree content with jsx</td>
        </tr>
        <tr>
            <td>renderNodeContent</td>
            <td>function(create,node)</td>
            <th></th>
            <td>add node content with jsx</td>
        </tr>
    </tbody>
</table>

### tree events
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th style="width: 100px;">name</th>
            <th style="width: 50px;">type</th>
            <th style="width: 50px;">default</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>select</td>
          <td>function(node)</td>
          <th></th>
          <td>called when select node and you should set selected item</td>
        </tr>
        <tr>
          <td>menudrop</td>
          <td>function(key)</td>
          <th></th>
          <td>called when collapse node parent and you should set droped keys</td>
        </tr>
        <tr>
          <td>nodeCheck</td>
          <td>function(Obj)</td>
          <th></th>
          <td>called when check node parent and you should set checkedkeys</td>
        </tr>
    </tbody>
</table>