//
//  HybridiUIAppDelegate.h
//  HybridiUI
//
//  Created by Sean Gilligan on 3/26/09.
//  Copyright __MyCompanyName__ 2009. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef enum wvm {
	modeLocal = 1,	// Everything local
	modeRemote,		// Everything remote
	modeMixed		// Remote page, local baseDir
} WebViewMode;
	

@interface HybridiUIAppDelegate : NSObject <UIWebViewDelegate> {
    UIWindow *window;
	IBOutlet UIWebView *webView;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;

- (void)loadWebView;

@end

