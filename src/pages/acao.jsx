import Head from "next/head";
import Container from "@/components/ui/Container";

export default function Acao ({seriesAcao}){
    return (
        <>
        
            <Head>
                <title>Séries de ação e aventura</title>
                <meta 
                    name="description"
                    content="séries do gênero de ação e aventura"
                    />
                <meta name="keywords" content="Séries, Ação, Aventura, Séries de Ação, Séries de Aventura"/>
            </Head>
            <h1>Séries de Ação e aventura</h1>
            <div>
                {seriesAcao.map((serie) => 
                    <article key={serie.id}>
                        {serie.poster_path && (
                        <img
                        src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`}
                        alt={`${serie.name} Poster`}
                        />
                )}
                 <strong>{serie.name}</strong>
                 <p>{serie.first_air_date}</p>
                    </article>
                )}
            </div>
        </>
    );
}

export async function getStaticProps (){
    const apiKey = "701bae577a262e4406a9a09430d701ed";
    const generoAcaoAventura = 10759;

    try {
       const resposta = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${generoAcaoAventura}&language=pt-BR`);

       if (!resposta.ok) {
        throw new Error('Falha ao carregar series de ação e aventura');
      }

      const dados = await resposta.json();

          return {
            props: {
              seriesAcao: dados.results,
            },
          };
      
        } catch (error) {
          console.error(`Erro durante a obtenção dos dados: ${error.message}`);
          return {
            notFound: true,
          };
    }
}