import localtunnel from 'localtunnel';
import config from './config';

export default () => {
  localtunnel(config.PORT, {"subdomain": config.TUNNEL.SUBDOMAIN}, function(error, tunnel) {
    if(tunnel){
      console.log(`Server is published to ${tunnel.url}`);
    }
    if(error){
      console.log(error);
    }
  });

  process.on('exit', function() {
    console.log(`Close tunnel`);
    tunnel.close();
  });
};
