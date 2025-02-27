const find_store = (store_name) => {
    const webpack_chunk = window.webpackChunkdiscord_app;
    if (!webpack_chunk) return null;

    let found_module;

    webpack_chunk.push([
        [Math.random()],
        {},
        (req) => {
            found_module = null;

            for (const module_id in req.c) {
                const module = req.c[module_id];
                if (!module?.exports) continue;

                if (module.exports.default?._dispatcher?._actionHandlers?._orderedActionHandlers?.[store_name]) {
                    found_module = module.exports.default;
                    break
                }

                if (module.exports[store_name]) {
                    found_module = module.exports[store_name];
                    break;

                }
            }
        }
    ]);

    webpack_chunk.pop();

    return found_module
}