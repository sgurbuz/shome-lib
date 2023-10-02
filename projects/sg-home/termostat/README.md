# Header Module

Termostat Component is a heating management UI component for smart home projects in Angular.

### Installation

To install Termostat Component:

```bash
$ npm set registry https://registry.npmjs.org/
$ npm install @sg-home/termostat -s
```

Just import it to your project of `@NgModule` import section.

```typescript
@NgModule({
 imports: [CommonModule, TesmostatModule],
})
export class AppModule {
}
```

<sub>app.component.html</sub>

```html
<sg-home-termostat
 [minTemp]="15"
 [maxTemp]="75"
 [currentTemp]="24" 
>
</sg-home-termostat>
```
