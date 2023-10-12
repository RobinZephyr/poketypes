  import { useMutation } from '@tanstack/react-query';
  import { useEffect, useState } from 'react';


  
  const [type,setPokemonType] = useState('')
  const [typeColor, setTypeColor] = useState('');
  interface PokemonData {
    pokemon: string;
    type: string;
  }
  
  
  export default function FetchQueryPractice() {

    const [usePokemon, setUsePokemon] = useState<PokemonData>({ pokemon: '', type: '' });


    const {mutate, data, isLoading} = useMutation({
      
      mutationFn: async (rawData:Record <string,string>) =>{
        const response = await fetch('/api/hello', {
          method:'POST',
          body:JSON.stringify(rawData),
        });

        if(!response.ok) throw new Error('Error');

        const fromServer = JSON.parse(await response.json());
        console.log(fromServer);


        setUsePokemon(fromServer);
        setPokemonType(fromServer.type);
        return{
          pokemon:fromServer.pokemon,
          type:fromServer.type,
        };

      },
    });


    const submitPokemon = (evt: React.FormEvent) => {
      evt.preventDefault();
      const formElement = evt.currentTarget as HTMLFormElement; // Explicitly cast to HTMLFormElement
      const formData = new FormData(formElement);
      const entries = formData.entries();
      const rawData = Object.fromEntries(entries) as Record<string, string>;
    
    
      mutate(rawData);
    }

    useEffect(() => {
      const lowType= type.toLowerCase();
      // Use a switch statement to set the CSS class accordingly
      switch (lowType) {
        case 'fire':
          setTypeColor('red');
          break;
        case 'water':
          setTypeColor('blue');
          break;
        case 'grass':
          setTypeColor('green');
          break;
        case 'bug':
          setTypeColor('#90EE90');
          break;
        case 'normal':
          setTypeColor('gray');
          break;



          case 'ice':
            setTypeColor('#ADD8E6');
            break;
          case 'rock':
            setTypeColor('#C4A484');
            break;
          case 'ground':
            setTypeColor('#964B00');
            break;
          case 'flying':
            setTypeColor('white');
            break;
          case 'psychic':
            setTypeColor('pink');
            break;      
            case 'electric':
            setTypeColor('yellow');
            break;
            case 'fighting':
              setTypeColor('#FF4500');
              break;
            case 'dark':
              setTypeColor('gray');
              break;
            case 'ghost':
              setTypeColor('#4B0082'); 
              break;
            case 'fairy':
              setTypeColor('#FFB6C1');
              break;
            case 'dragon':
              setTypeColor('purple');
              break;   
              case 'poison':
                setTypeColor('violet');
                break;
                case 'steel':
                  setTypeColor('silver');
                  break;
                  
        default:
          setTypeColor('');
      }
    }, [type]);
    


      return (
        <div className='container'>

        <div className='middleman'>
        <form
        className='form-container'
        onSubmit={submitPokemon}>
        <input type="text" name="pokemon" />
        <input type="text" name="type" />
        <button type="submit">Save</button>
        </form>


        <div className='table-container'>
        <table >
          <thead>
              <tr>

                <th style={{border:'1px solid black'}}>
                  Pokemon
                </th>
                <th style={{border:'1px solid black'}}>Type</th>
              </tr>
        </thead>

        <tbody>
              <tr className=''>
                <th style={{border:'1px solid black'}}>
                  {usePokemon?.pokemon}
                </th>
                <th style={{ border: '1px solid black', backgroundColor: typeColor }}>
                  {usePokemon?.type}
                </th>

              </tr>
        </tbody>
        </table>
        </div>
  </div>  
  </div>
      );
    }
    