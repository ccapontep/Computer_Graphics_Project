var renderer,
	scene,
	camera,
	light,
	light2;
var angle_grabber = 0; // grabber_base current angle at the moment
var step_1_check = false;
var step_2_check = false;
///RENDERER
renderer = new THREE.WebGLRenderer({canvas: myCanvas, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
///SCENE
scene = new THREE.Scene();
scene.background = new THREE.Color( 0x81D4FA );
///CAMERA
camera = new THREE.PerspectiveCamera( 55, window.innerWidth/window.innerHeight, 0.1, 3000 );
var controls = new THREE.OrbitControls( camera );
camera.position.set( 2000, 1200, 1400 );
controls.update();
///LIGHTS
light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//GIANT - CUBE //
var earth_geometry = new THREE.CubeGeometry(5000,0,5000);
var earth_material= new THREE.MeshBasicMaterial({ color: 0xb32d00 });
var earth = new THREE.Mesh(earth_geometry,earth_material);
scene.add(earth);
// END-OF-GIANT-CUBE//

/// TREEE
var tree = new THREE.Tree({
    generations : 3,        // # for branch' hierarchy
    length      : 200,      // length of root branch
    uvLength    : 600.0,     // uv.v ratio against geometry length (recommended is generations * length)
    radius      : 20,      // radius of root branch
    radiusSegments : 16,     // # of radius segments for each branch geometry
    heightSegments : 32      // # of height segments for each branch geometry
});

var geometryt = THREE.TreeGeometry.build(tree);

var trex_1 = new THREE.Mesh( geometryt, new THREE.MeshPhongMaterial({ color: 0x8B4513 })); // set any material
trex_1.position.set(500, earth.getWorldPosition().y, -500)

//var trex_2 = new THREE.Mesh( geometryt, new THREE.MeshPhongMaterial({color: 0x8B4513})); // set any material
//trex_2.position.set(0, earth.getWorldPosition().y, 500)

var trex_3 = new THREE.Mesh( geometryt, new THREE.MeshPhongMaterial({color: 0x8B4513})); // set any material
trex_3.position.set(-500, earth.getWorldPosition().y, -500)

var trex_4 = new THREE.Mesh( geometryt, new THREE.MeshPhongMaterial({color: 0x8B4513})); // set any material
trex_4.position.set(0, earth.getWorldPosition().y, -500)

scene.add(trex_1, trex_3, trex_4);

/// LEAF
var distance_y = [700, 400, 700, 500, 700, 400, 700, 500, 500];
var distance_z = [-300, -100, 300, 100, -200, 200, 0, 300, -200];

var distance_y = [700, 700, 700, 400, 400, 700, 500, 500, 500];
var distance_z = [-300, 300, -200, 200, -100, 0, 300, -200, 100];
var leaf_geometry = new THREE.SphereGeometry(100,100,100);
leaf_geometry.scale(3, 1.5, 1.5)
var leaf_material_1 = new THREE.MeshLambertMaterial({ color: 0x00CC33 });
var leaf_material_2 = new THREE.MeshLambertMaterial({ color: 0x33CC00  });

var change_leaf = true;
var leaf_1 = new THREE.Mesh( leaf_geometry, leaf_material_1 );
var leaf_2 = new THREE.Mesh( leaf_geometry, leaf_material_2 );
var leaf_group = new THREE.Object3D();
for (var j = 2; j < 5; j++){
	for ( var i = 0; i < 9; i ++ ) { // create 8 set of leafs
			if (change_leaf) {
				var leaf_instance = leaf_1.clone(); // clone the leaf
				change_leaf = !change_leaf;}
			else {
				var leaf_instance = leaf_2.clone();
				change_leaf = !change_leaf;}

			leaf_group.add(leaf_instance);
			//for (var j = 0; j < 5; j++){
			if (j==2) trex_1.add(leaf_instance); // add to 1st tree truck
			//else if (j==2) trex_2.add(leaf_instance); // add to 2nd tree truck
			else if (j==3) trex_3.add(leaf_instance); // add to 3rd tree truck
			else if (j==4) trex_4.add(leaf_instance); // add to 4th tree truck
			leaf_instance.position.set(0, distance_y[i] , distance_z[i]);
	}
}
scene.add(leaf_group);
/////////// END OF TREE ///////////////

/////////// BASKET ///////////////////
var basket_geometry = new THREE.CylinderGeometry(100,50,50);
basket_geometry.scale(1, 3, 1)
basket_geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,75,0));
var basket_texture = new THREE.TextureLoader().load("basket_texture.jpg");
var basket_material = new THREE.MeshPhongMaterial({ map: basket_texture });
basket_texture.wrapS = THREE.RepeatWrapping;
basket_texture.wrapT = THREE.RepeatWrapping;
basket_texture.repeat.set( 5, 5);

var basket = new THREE.Mesh(basket_geometry,basket_material);
basket.position.set(1100, earth.getWorldPosition().y, 100);
scene.add(basket)
///////////// END BASKET //////////////

//CONSTRUCT THE ROBOT//

//BASE
var base_geometry = new THREE.CylinderGeometry(50,50,25);
var base_material = new THREE.MeshPhongMaterial({ color: 0x31a6ff });
var robot_base = new THREE.Mesh(base_geometry,base_material);
robot_base.position.z = 0;
robot_base.position.y = earth.getWorldPosition().y + 50;
//robot_base.position.x = 20;

// WHEELS
var w_distance_x = [-30, 30, -30, 30];
var w_distance_z = [30, 30, -30, -30];

var wheel_geometry = new THREE.SphereGeometry(15, 15, 15);
var wheel_texture = new THREE.TextureLoader().load("strips.png");
var wheel_material = new THREE.MeshBasicMaterial({ map: wheel_texture });
wheel_texture.wrapS = THREE.RepeatWrapping;
wheel_texture.wrapT = THREE.RepeatWrapping;
wheel_texture.repeat.set( 4, 4);
//var wheel = new THREE.Mesh( wheel_geometry, wheel_material );
//var wheel_group = new THREE.Object3D();
for ( var i = 1; i < 5; i ++ )
{ // create 4 set of wheels
		//var wheel_name = "wheel_" + i.toString();
		var wheel = new THREE.Mesh( wheel_geometry, wheel_material );
		wheel.name = "wheel_" + i.toString();

		scene.add(wheel);

		robot_base.add(wheel);
		wheel.position.set(
			robot_base.position.x + w_distance_x[i-1],
			- robot_base.position.y * 0.5 ,
			robot_base.position.z + w_distance_z[i-1]);
}

//JOINT-1
var joint_1_geometry = new THREE.CylinderGeometry(10,10,150);
joint_1_geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,75,0));
var joint_1_material = new THREE.MeshPhongMaterial({ color: 0xFF8C00 });
var joint_1 = new THREE.Mesh(joint_1_geometry,joint_1_material);
robot_base.add(joint_1);
joint_1.position.y = robot_base.geometry.parameters.height /2 ;

//JOINT-2
var joint_2_geometry = new THREE.CylinderGeometry(10,10,150);
joint_2_geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,75,0));
var joint_2_material = new THREE.MeshPhongMaterial({ color: 0x9966cc });
var joint_2 = new THREE.Mesh(joint_2_geometry,joint_2_material);
joint_1.add(joint_2);
joint_2.position.y = joint_1.geometry.parameters.height;

//JOINT-3
var joint_3_geometry = new THREE.CylinderGeometry(10,10,250);
joint_3_geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,125,0));
var joint_3_material = new THREE.MeshPhongMaterial({ color: 0xff6666 });
var joint_3 = new THREE.Mesh(joint_3_geometry,joint_3_material);
joint_3.position.y = joint_2.geometry.parameters.height;
joint_2.add(joint_3);

//GRABBER_BASE
var grabBase_geometry = new THREE.CubeGeometry(100,10,10);
var grabBase_material = new THREE.MeshPhongMaterial({ color: 0xFF8C00 });
var grabber_base = new THREE.Mesh(grabBase_geometry, grabBase_material);
grabber_base.position.y = joint_3.geometry.parameters.height;
joint_3.add(grabber_base);

//GRABBER ARMS
//LEFT_ARM
var leftArm_geometry = new THREE.CubeGeometry(10,70,10);
leftArm_geometry.applyMatrix(new THREE.Matrix4().makeTranslation(5,35,5));
var leftArm_material = new THREE.MeshPhongMaterial({ color: 0xFF8C00 });
var grabber_leftArm = new THREE.Mesh(leftArm_geometry, leftArm_material);
grabber_leftArm.position.y = 5;
grabber_leftArm.position.x = -55;
//grabber_leftArm.rotation.z = 0.1;
grabber_base.add(grabber_leftArm);
//RIGHT_ARM
var rightArm_geometry = new THREE.CubeGeometry(10,70,10);
rightArm_geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,35,0));
var rightArm_material = new THREE.MeshPhongMaterial({ color: 0xFF8C00 });
var grabber_rightArm = new THREE.Mesh(rightArm_geometry, rightArm_material);
grabber_rightArm.position.y = 5;
grabber_rightArm.position.x = 55;
//grabber_rightArm.rotation.z = -0.1;
grabber_base.add(grabber_rightArm);
scene.add(robot_base);
/////// END-OF-ROBOT /////////////////////////////////////////////////////////////////////////////////////////////

//FRUITS//
//ORANGE
var orange_geometry = new THREE.SphereGeometry(25,25,25);
var orange_texture = new THREE.TextureLoader().load("orange.jpg");
var orange_material = new THREE.MeshBasicMaterial({ map: orange_texture });
orange_texture.wrapS = THREE.RepeatWrapping;
orange_texture.wrapT = THREE.RepeatWrapping;
orange_texture.repeat.set( 1, 1);
var orange = new THREE.Mesh(orange_geometry, orange_material);
orange.position.z = -80;
orange.position.x = 300;
orange.position.y = 400;
scene.add(orange);

//APPLE
var apple_geometry = new THREE.SphereGeometry(25,25,25);
var apple_texture = new THREE.TextureLoader().load("apple.jpg");
var apple_material = new THREE.MeshBasicMaterial({ map: apple_texture });
apple_texture.wrapS = THREE.RepeatWrapping;
apple_texture.wrapT = THREE.RepeatWrapping;
apple_texture.repeat.set( 1, 1);
var apple = new THREE.Mesh(apple_geometry, apple_material);
apple.position.z = -1000;
apple.position.x = 250;
apple.position.y = 50;
scene.add(apple);
/////////// END OF FRUITS /////////////////////////////////////////////////////////

var canvas = document.getElementById("myCanvas");
var canvasPosition = renderer.domElement.getBoundingClientRect();

var translation_part = false;
document.getElementById("button1").onclick = function()
	{
		step_1_check = !step_1_check;
		translation_part = true;
	};

// Function calculates the angle between 3 points, #TODO :: give parameters for later use !!!
var gp;
var j3;
var op
var calculate_angle = function(){
		gp = grabber_base.getWorldPosition();
	    op = orange.getWorldPosition();
	    j3 = joint_3.getWorldPosition();

	// p1 should be origin point = joint 3 pivot
	var p1={x:j3.z,y:j3.y};
	var p2={x:gp.z,y:gp.y};
	var p3={x:op.z,y:op.y};
	var p12 = Math.sqrt(Math.pow((p1.x - p2.x),2) + Math.pow((p1.y - p2.y),2));
	var p13 = Math.sqrt(Math.pow((p1.x - p3.x),2) + Math.pow((p1.y - p3.y),2));
	var p23 = Math.sqrt(Math.pow((p2.x - p3.x),2) + Math.pow((p2.y - p3.y),2));
	//angle in radians
	var resultRadian = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13));
	//angle in degrees
	var resultDegree = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13)) * 180 / Math.PI;
	resultDegree = Math.round(resultDegree);
	return resultDegree;
}
////////// END OF FUNCTION /////////////////
///////////////////////////////////////////
/*var show_circle = function()
{
	//CIRCLESSS
	gp = grabber_base.getWorldPosition();
	j3 = joint_3.getWorldPosition();
	var geometry = new THREE.CircleGeometry( joint_3.geometry.parameters.height+grabber_leftArm.geometry.parameters.height, 32 );
	var material = new THREE.LineBasicMaterial( { color: 0x020202} );
	var circle = new THREE.Line( geometry, material );
	circle.position.z = 0;
	circle.position.x = j3.x;
	circle.position.y = j3.y;
	scene.add( circle );
}*/
var distance = joint_3.geometry.parameters.height;
distance = Math.round(distance)+40  ;
var free_fall = false;
//////Animation////////
var once = false;
var angx;

var animate = function ()
{
	/////// GET CLOSER TO FRUIT /////////////
	if (step_1_check)

		{   //////////  TRANSLATION PART /////////////

			if (translation_part )
			{
				if (robot_base.position.x < orange.position.x) robot_base.position.x += 1.0;
				else robot_base.position.x -= 1.0;
				if (robot_base.position.z < orange.position.z +distance) robot_base.position.z += 1.0;
				else robot_base.position.z -= 1.0;
				angx = calculate_angle();
				scene.getObjectByName("wheel_1").rotation.z += 0.2;
				scene.getObjectByName("wheel_4").rotation.z += 0.2;
				scene.getObjectByName("wheel_2").rotation.z += 0.2;
				scene.getObjectByName("wheel_3").rotation.z += 0.2;
			}
				/////////// CHECK TRANSLATION FINISHED /////////////////
			if ((robot_base.position.x == orange.position.x) && (robot_base.position.z - distance == orange.position.z))
				{translation_part = false; console.log ("translation falseeeeee"); }

				///////////// ROTATION PART ///////////////////////////
			if (translation_part == false)
			{
				while (angx > 0)
				{
					joint_3.rotation.x -= radians(1);
					angx -=1;
				}
				step_2_check = true;
			}

		}
 ////////////////// GRAB - GO TO BASKET //////////////////////
	if (step_2_check)

	{	setTimeout( function()
			{
			if (grabber_rightArm.rotation.z < radians(30))
				{grabber_rightArm.rotation.z += 0.25;
				 grabber_leftArm.rotation.z = -grabber_rightArm.rotation.z;}


		grabber_base.add(orange);
		orange.position.set(0, 40, 0);
		setTimeout( function()
  		{
		if (grabber_base.getWorldPosition().x < basket.position.x)	robot_base.position.x += 1.0;
		else if (grabber_base.getWorldPosition().x > basket.position.x) robot_base.position.x -= 1.0;
		else {}

		if (grabber_base.getWorldPosition().z < basket.position.z)	robot_base.position.z += 1.0;
		else if (grabber_base.getWorldPosition().z > basket.position.z)robot_base.position.z -= 1.0;
		else {}
		scene.getObjectByName("wheel_1").rotation.z += 0.2;
		scene.getObjectByName("wheel_4").rotation.z += 0.2;
		scene.getObjectByName("wheel_2").rotation.z += 0.2;
		scene.getObjectByName("wheel_3").rotation.z += 0.2;
		//console.log(grabber_base.getWorldPosition().z);
		//console.log(basket.position.z);

		if ((grabber_base.getWorldPosition().x == basket.position.x) && (Math.round(grabber_base.getWorldPosition().z)  == basket.position.z))
			{
				//console.log("bingoooooo");
				free_fall = true;
				step_1_check = false;


			}

		var i = 0;
	}, 1000);
	}, 1000);
	}

	if (free_fall)
	{	//console.log("bingoooooo");


			/*if (i == 0)
			{
				var orange_tmp_x = orange.getWorldPosition().x;
				var orange_tmp_y = orange.getWorldPosition().y;
				var orange_tmp_z = orange.getWorldPosition().z;
				grabber_base.remove(orange);
				orange.position.set(orange_tmp_x, orange_tmp_y, orange_tmp_z);
				scene.add(orange);
				i++;
			}*/


		if (orange.position.y > earth.getWorldPosition().y + orange.geometry.parameters.radius)
		{
			//console.log(orange.position.y);
			orange.position.y -= 0.5;
			//console.log(orange.position.y);

		}

		//if (orange.position.y = earth.getWorldPosition().y + orange.geometry.parameters.radius)




	}
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );

};
animate();
