var restify = require('restify');

var server  = restify.createServer({
    name:'trabalho3',
    version:'1.0.0'
});

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'restserver'
  }
});

const errs = require('restify-errors');

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8080,function(){
              console.log('%s ouvindo na porta %s',server.name, server.url)
              });


//rotas


server.get('/positions/:id',(req,res,next)=>{
    
    const {id} = req.params;
    
    knex('trabalho')
    .where('id',id)
    .first()
    .then((dados)=>{
        if(!dados)
            return res.send(new errs.BadRequestError('Nenhum registro encontrado'))
        res.send(dados);
    },next)
    
});


server.get('/positions.json',(req, res, next)=>{
	const { description, location, full_time } = req.query;

	console.log(req.query)

	console.log(description, location, full_time);

	if(description != null && !location && !full_time) {
		knex('trabalho')
		.where('description',description)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	} else 	if(!description && location!=null && !full_time) {
		knex('trabalho')
		.where('location',location)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	
	}else 	if(!description && !location && full_time != null) {
		knex('trabalho')
		.where('full_time',full_time)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	
	}else if(description != null && location != null && !full_time) {
		knex('trabalho')
		.where('description',description)
		.where('location', location)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	}else if(description != null && !location && full_time != null) {
		knex('trabalho')
		.where('description',description)
		.where('location', location)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	}  else if(description != null && location != null && full_time !=null) {
		knex('trabalho')
		.where('description',description)
		.where('location', location)
		.where('full_time',full_time)
		.then((dados) => {
			if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
			res.send(dados);
		},next)
	}

});

