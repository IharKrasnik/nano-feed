<script>
  let option = 'a';
  
  const setOption = (newOption) => {
    option = newOption;
  }
</script>

<div class="_toggle">
  <div class="_item" class:_active={option === 'a'} on:click={() => setOption('a')}>
    A
  </div>

  <div class="_item" class:_active={option === 'b'}  on:click={() => setOption('b')}>
    B
  </div>
</div>

<style>
  ._toggle {
    cursor: pointer;
    background: #F5F5F5;
    display: inline;
    padding: 3px 0px;
    border-radius: 20px;
  }

  ._item {
    color: #8B786D;
    font-size: 14px;
    padding: 14px;
    display: inline;
    transition: all 0.2s linear;
    padding: 3.5px 7px;
    border-radius: 20px;
  }

  ._item._active, ._item:hover {
    background: #8B786D;
    color: white;
  }
</style>