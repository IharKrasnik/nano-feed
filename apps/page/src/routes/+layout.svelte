<script>
  import "../app.css";
</script>

<style>
  :global(body) {
    font-family: Inter;
  }

  :global(input) {
    background: #F6F5F5;
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 8px;
  }

  :global(select) {
    background: #F6F5F5;
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 8px;
  }

  :global(textarea) {
    background: #F6F5F5;
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 8px;
  }

  :global(button) {
    cursor: pointer;
    border-radius: 8px;
    padding: 10px 18px;
  }

  :global(button._primary) {
    background-color: #8B786D;
    color: white;
  }

  :global(button._secondary) {
    border: 1px #8B786D solid;
  }
</style>

<slot />

