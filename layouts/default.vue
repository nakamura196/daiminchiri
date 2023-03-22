<template>
  <LayoutsApp>
    <LayoutsHeader> </LayoutsHeader>

    <MoleculesMenuToTopBtn />

    <v-main>
      <slot />
    </v-main>

    <LayoutsFooter></LayoutsFooter>
  </LayoutsApp>
</template>
