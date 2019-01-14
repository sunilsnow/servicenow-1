/* create an associated array to contain parent record, then loop through the parent to pull in the children data rather than a nested query */

var parent = [];
var grParent = new GlideRecord('my_table');
	grParent.addQuery('active',true);
	grParent.query();
while(grParent.next())
{
	var tempObj = {};
		tempObj.parent = {};
		tempObj.parent.id = grParent.sys_id+"";
		tempObj.parent.display = grParent.getDisplayValue();
	parent[grParent.sys_id+""] = tempObj;
}

while(x in parent)
{
	var parentID = parent[x].parent.id+"";
	
	var grChild = newGlideRecord('my_child_table');
		grChild.addQuery('parent',parentID);
		grChild.addQuery('active',true);
		grChild.query();
	
	while(grChild.next())
	{
		parent[x].child = {}; // make this an array containing the object if association is many (child) to one (parent)
		parent.child.id = grChild.sys_id+"";
		parent.child.display = grChild.getDisplayValue();
	}
}

=====
	
	<table class="table table-rounded" ng-if="data.divList" ng-repeat="h in data.divList">
       <thead>
         <tr>
           <th>{{h.parent.display}}</th>
           <th></th>
           <th>Room Number: {{h.parent.room}}</th>
         </tr>
       </thead>
         <tbody >
         <tr ng-repeat="s in h.parent.child">
           <td>
           {{s.user_last}}, {{s.user_first}}
           </td>
           <td>
             {{s.user_title}}
           </td>
           <td>
             {{s.user_office_phone}}
           </td>
         </tr>
       </tbody>
     </table>