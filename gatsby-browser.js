const greeting = String.raw`
 ________  ________  ___     
|\   ____\|\   ____\|\  \    
\ \  \___|\ \  \___|\ \  \   
 \ \  \    \ \  \    \ \  \  
  \ \  \____\ \  \____\ \  \ 
   \ \_______\ \_______\ \__\
    \|_______|\|_______|\|__|
                             
Website by Moritz Salla & Josh Murr                          
`;

console.info(greeting);

export const onServiceWorkerUpdateReady = () => window.location.reload();
