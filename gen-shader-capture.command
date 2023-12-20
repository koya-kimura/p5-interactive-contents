now=`date +%Y-%m-%d-%H-%M-%S`

cp -R templete/shader-capture src/$now
code -r src/$now/sketch.js