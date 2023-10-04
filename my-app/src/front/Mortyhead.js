import React from 'react';
import '../css/morty.css'

function Morty() {
  return (
    <div class="morty">
        <div class="outer-head">
            <div class="hair"></div>
            <div class="ear left"></div>
            <div class="ear right"></div>
            <div class="head"></div>
            <div class="eye left">
                <div class="ball"></div>
            </div>
            <div class="eye right">
                <div class="ball"></div>
            </div>
            <div class="nose"></div>
            <div class="mouth"></div>
        </div>
    </div>
  );
}

export default Morty;