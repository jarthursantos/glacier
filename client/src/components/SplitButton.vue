<template>
  <div class="split-button__wrapper">
    <div class="split-button__container">
      <button class="split-button__primary">
        <span>Solicitar Jan/2012</span>
      </button>

      <hr>

      <button class="split-button__secondary">
        <i class="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i>
      </button>
    </div>
  </div>  
</template>

<script>
export default { }
</script>

<style scoped>
.split-button__wrapper {
}

.split-button__container {
  position: relative;
  display: flex;
  flex-direction: row;
}

.split-button__container > hr {
  position: absolute;
  right: 31px;
  top: 8px;
  bottom: 8px;

  border: none;
  border-left: 1px solid rgb(252, 247, 247);
}

.split-button__primary,
.split-button__secondary {
  height: 32px;
  border: 2px solid #0078D4;
  background-color: #0078D4;
}

.split-button__primary > span,
.split-button__secondary > i {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.split-button__primary:hover:not(:disabled),
.split-button__secondary:hover:not(:disabled) {
  background-color: #106EBE;
  border-color: #106EBE;
}

.split-button__primary:active:not(:disabled),
.split-button__secondary:active:not(:disabled) {
  background-color: #005A9E;
  border-color: #005A9E;
}

.split-button__primary:focus-visible:not(:active),
.split-button__secondary:focus-visible:not(:active) {
  background-color: #FFF;
  border-color: #0078D4;
}

.split-button__primary:focus-visible:not(:active) > span,
.split-button__secondary:focus-visible:not(:active) > span {
  background-color: #0078D4;
}

.split-button__primary {
  padding: 0 20px;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}

.split-button__secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  width: 32px;
}
</style>