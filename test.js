const MovieDB = require('moviedb')('65df1022a70a9ad63fbfa028ad61d139');



                MovieDB.searchMovie({ query: "saw" }, (err, res) => {
                    
                    if (err){
                        console.log(err)
                    }else{
                    
                        console.log(`Popularity:   ${res.results[0].popularity}
                        Title:   ${res.results[0].original_title}
                        Overview:  ${res.results[0].overview}
                        Date: ${res.results[0].release_date}`);                
 }                  

                  });