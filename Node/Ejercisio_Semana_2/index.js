//aqui arriba estaran nuestros archivos imporatdos los cuales usaremos

//fs nos ayuda a leer y escribir contenido(texto) de diferentes tipos de archivos, en este caso de razas.txt
const fs = require('fs');
//superagent es una pequeña biblioteca progresiva de solicitudes HTTP del lado del cliente la cual nos ayudara a leer nuestra api y mandar la solicitud de la misma
const superagent = require('superagent');

//esta funcion nos ayudara a leer el archivo razas.txt y a organizarlo de una manera la cual pueda ser leido por la api
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject('I could not find that file 😢');
      const lines = data.split(',').map(line => line.trim()).filter(line => line !== '');
      resolve(lines);
    });
  });
};

//esta funcion escribira la direccion de las url en un nuevo archivo el cual nosotros le asiganemros el nombre y donde estara ubicado
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });
};


//esta es la funcion la cual llevara a cabo el proceso de nuestras dos funciones anteriores
const getDogPics = async () => {
  try {
    //mandaremos a ejecutar la funcion readFilePro para extraer nuestras razas de perros a buscar
    const breeds = await readFilePro(`${__dirname}/razas.txt`);
    //haremos un log para poder ver las razas que se estan buscando
    console.log(`Breeds: ${breeds.join(', ')}`);
    
    //esta funcion hara un ciclo por cada dato obtenido en el breed y lo mandara uno por uno a la api para obtener su url
    const imgPromises = breeds.map(async breed => {
      const res = await superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
      return res.body.message;
    });
    
    //aqui obtendremos los datos de la pormesa anterior para poder usarlos posteriosmente 
    const imgs = await Promise.all(imgPromises);
    //haremos un log para conprobar que si se estan mandando las url requeridas
    console.log(imgs);

    //aqui haremos uso de nuestra funcion writeFilePro para guardar las urls de las imagenes en un nuevos archivo txt el cual nosotros le asignaremos un nombre, en este caso es razas-imgs.txt
    await writeFilePro('./dogs-imgs/razas-imgs.txt', imgs.join('\n'));
    //mandaremos un log para comprobar que todo halla salido bien
    console.log('Random dog images saved to file!');
  } catch (err) {
    //en caso de haber un error se mandara un log el cual nos dira el error y con el throw mataremos el proceso
    console.log(err);
    throw err;
  }
  //retornamos una respuesta para confirmar que todo salio bien
  return '2: READY 🐶';
};

//esta estructura lo que hara sera priorizar todas las funciones asiganadas aqui sin importar donde se ubiquen
(async () => {
  try {
    console.log('1: Will get dog pics!');
    //ejecutamos la funcion anterior para que haga todo el proceso de las imagenes
    const x = await getDogPics();
    //x es la respuesta de nuestra funcion getDohPics la cual nos dira si se ejecuto con exito o a habido un error
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR 💥');
  }
})();
