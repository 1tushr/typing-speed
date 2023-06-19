import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    box-sizing:border-box;
}
body{
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.background};
    margin:0;
    padding:0;
    transition:all 0.25 linear;
    padding-top:10rem;
}

.canvas{
    display:grid;
    min-height:75vh;
    grid-auto-flow:row;
    grid-template-rows:auto 1fr auto;
    gap:0.5rem;
    padding:2rem;
    width:100vw;
    align-items:center;
    text-align:center;
    
}

.type-box{
    display:block;
   width:80rem;
    margin-left:auto;
    margin-right:auto;
    overflow:hidden;
    
    
}

.words{
    font-size: 32px;
    display: flex;
    flex-wrap: wrap;
    align-content:center;
color:${({ theme }) => theme.typeBoxColor}
}
.word{
    margin: 5px;
    padding-right:2px;
}


.hidden-input{
    opacity:0;
}

.current {
    border-left:1px solid;
animation:blinking 2s infinite;
animation-timing-function:ease;
    @keyframes blinking {
        0%{border-left-color:${({ theme }) => theme.textColor}}
        25%{border-left-color:black}
        50%{border-left-color:${({ theme }) => theme.textColor}}
        75%{border-left-color:black}
        100%{border-left-color:${({ theme }) => theme.textColor}}
    }
}
.current-right {
    border-right:1px solid;
animation:blinkingRight 2s infinite;
animation-timing-function:ease;
    @keyframes blinkingRight {
        0%{border-right-color:${({ theme }) => theme.textColor}}
        25%{border-right-color:black}
        50%{border-right-color:${({ theme }) => theme.textColor}}
        75%{border-right-color:black}
        100%{border-right-color:${({ theme }) => theme.textColor}}
    }
}


.correct{
    color:${({ theme }) => theme.typeBoxColor};
}
.incorrect{
    color:red;
}

.upper-menu{
    display:flex;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
    justify-content:space-between;
    font-size:1.35rem;
    padding:0.5rem;
    
}

.modes{
    display:flex;
    gap:1rem;
}
.time-mode:hover{
    color:green;
   cursor:pointer; 
}

.footer{
    display:flex;
    align-self: end;
    margin-left:auto;
    margin-right:auto;
    justify-content:space-evenly;
    margin-top:2rem;
    margin-bottom:2rem;
}
.left-stats{
    margin-left:auto;
    margin-right:auto;
    width: 50%;
    
}

.right-stats{
    margin-left:auto;
    margin-right:auto;
    width: 50%;
}

.header{
    display: flex;
    width: 1000px;
    align-self: stretch;
    margin-left: auto;
    margin-right: auto;
    height: 80px;
    justify-content: space-between;
}

/* .logo{
    width :10px;
    height:10px;
} */
`;