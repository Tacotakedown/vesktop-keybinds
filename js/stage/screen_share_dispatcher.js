const input_object = {
    audio: true,
    contentHint: "motion",
    includeSources: "None"
};

const screen_share_dispatcher = () => {
    const MediaEngineStore = Vencord.Webpack.findStoreLazy("MediaEngineStorage");
    const WebpackCommon = Vencord.Webpack.Common;
    try {
        let frameRate = Number(60);
        let height = Number(1440);
        let width = Math.round(height * (16 / 9));
        let settings = [...MediaEngineStore.getMediaEngine().connections].find(O => O.streamUserId === WebpackCommon.UserStore.getCurrentUser().id);
        settings && (settings.videoStreamParameters[0].maxFrameRate = frameRate,
            settings.videoStreamParameters[0].maxResolution.height = height,
            settings.videoStreamParameters[0].maxResolution.width = width),
            a({
                id: l,
                ...n
            }),
            setTimeout(async () => {
                    let O = [...Me.getMediaEngine().connections].find(R => R.streamUserId === WebpackCommon.UserStore.getCurrentUser().id);
                    if (!O)
                        return;
                    let F = O.input.stream.getVideoTracks()[0]
                        , _ = {
                        ...F.getConstraints(),
                        frameRate: {
                            min: frameRate,
                            ideal: frameRate
                        },
                        width: {
                            min: 640,
                            ideal: L,
                            max: L
                        },
                        height: {
                            min: 480,
                            ideal: T,
                            max: T
                        },
                        advanced: [{
                            width: L,
                            height: T
                        }],
                        resizeMode: "none"
                    };
                    try {
                        await F.applyConstraints(_),
                            console.info("Applied constraints successfully. New constraints:", F.getConstraints())
                    } catch (R) {
                        console.error("Failed to apply constraints.", R)
                    }
                }
                , 100)
    } catch (h) {
        console.error("Error while submitting stream.", h)
    }
}