# JSON Patch OT

> Resolves outdated JSON Patches (RFC6902) in real-time JSON collaboration

Set of transformations for JSON Patch [Operational Transformations](https://en.wikipedia.org/wiki/Operational_transformation)

## Demo

[Full flow visualization](http://tomalec.github.io/PuppetJs-operational-transformation/visualization.html)

Separated demo will be provided soon.

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install json-patch-ot --save
```

Or [download as ZIP](https://github.com/PuppetJs/JSON-Patch-OT/archive/gh-pages.zip).

## Usage

```javascript
var transformedPatch = JSONPatchOT.transform( givenPatch, againstAnotherPatch);
// or
var transformedPatch = JSONPatchOT.transform( givenPatch, againstArrayOfPatches);
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/PuppetJs/JSON-Patch-OT/releases).

## License

MIT

## See also
- [fast JSON Patch](https://github.com/Starcounter-Jack/JSON-Patch)
- [JSON Patch Queue](https://github.com/PuppetJs/JSON-Patch-Queue)
- [JSON Patch OT](https://github.com/PuppetJs/JSON-Patch-OT)
- ...putting it all together: [PuppetJs](https://github.com/PuppetJs/PuppetJs)
